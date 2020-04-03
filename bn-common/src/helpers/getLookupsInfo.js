import { pouchService } from '@boatnet/bn-pouch';
import { get } from 'lodash';
const db = pouchService.db;
export function formatDisplayValue(row, displayFields) {
    const listModelName = displayFields ? displayFields : [];
    let displayValue = '';
    for (let i = 0; i < listModelName.length; i++) {
        displayValue = i < listModelName.length - 1 ?
            (displayValue += get(row, 'doc.' + listModelName[i]) + ' ')
            : listModelName[i] === 'vesselRegistration' ?
                get(row, 'doc.' + 'coastGuardNumber') ?
                    displayValue += '/ ' + get(row, 'doc.' + 'coastGuardNumber')
                    : displayValue += '/ ' + get(row, 'doc.' + 'stateRegulationNumber')
                : (displayValue += get(row, 'doc.' + listModelName[i]));
    }
    return displayValue;
}
function sortByProperty(array, displayFields) {
    return array.sort((val1, val2) => {
        const val1Name = formatDisplayValue(val1, displayFields);
        const val2Name = formatDisplayValue(val2, displayFields);
        if (val1Name > val2Name) {
            return 1;
        }
        else if (val1Name < val2Name) {
            return -1;
        }
        else {
            return 0;
        }
    });
}
export async function getOptions(appMode, view, viewType, displayFields) {
    return viewType === 'user' ? await getDocByType(appMode, view, displayFields)
        : await getLookupInfo(appMode, view, displayFields);
}
async function getLookupInfo(appMode, docType, displayFields) {
    const pouchDB = pouchService.db;
    const queryOptions = {
        inclusive_end: true,
        ascending: false,
        include_docs: true,
        reduce: false,
        key: docType
    };
    const view = 'LookupDocs/' + appMode + '-lookups';
    const results = await pouchDB.query(view, queryOptions, pouchService.lookupsDBName);
    return sortByProperty(results.rows, displayFields);
}
async function getDocByType(appMode, type, displayFields) {
    const designDoc = {
        _id: '_design/docType',
        views: {
            by_type: {
                // @ts-ignore
                // tslint:disable-next-line
                map: function (doc) { emit(doc.type); }.toString()
            }
        }
    };
    const queryOptions = {
        inclusive_end: true,
        ascending: false,
        include_docs: true,
        reduce: false,
        key: appMode + '-' + type
    };
    const results = await db.query('docType/by_type', queryOptions)
        .catch(async (err) => {
        await db.put(designDoc);
        return await db.query('docType/by_type', queryOptions);
    });
    return sortByProperty(results.rows, displayFields);
}
//# sourceMappingURL=getLookupsInfo.js.map