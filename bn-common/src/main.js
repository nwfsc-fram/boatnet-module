import Vue from 'vue';
import BoatnetAddSpeciesDialog from './components/BoatnetAddSpeciesDialog.vue';
import BoatnetButtonToggle from './components/BoatnetButtonToggle.vue';
import BoatnetButtonToggleComp from './components/BoatnetButtonToggleComp.vue';
import BoatnetCommonInputComponent from './components/BoatnetCommonInputComponent.vue';
import BoatnetCustomKeyboard from './components/BoatnetCustomKeyboard.vue';
import BoatnetDate from './components/BoatnetDate.vue';
import BoatnetDatetime from './components/BoatnetDatetime.vue';
import BoatnetWarningDialog from './components/BoatnetWarningDialog.vue';
import BoatnetTableComp from './components/BoatnetTableComp.vue';
import BoatnetInputDialog from './components/BoatnetInputDialog.vue';
import BoatnetKeyboard from './components/BoatnetKeyboard.vue';
import BoatnetKeyboardInput from './components/BoatnetKeyboardInput.vue';
import BoatnetKeyboardList from './components/BoatnetKeyboardList.vue';
import BoatnetKeyboardSelect from './components/BoatnetKeyboardSelect.vue';
import BoatnetKeyboardSelectList from './components/BoatnetKeyboardSelectList.vue';
import BoatnetList from './components/BoatnetList.vue';
import BoatnetLocation from './components/BoatnetLocation.vue';
import BoatnetLocations from './components/BoatnetLocations.vue';
import BoatnetSummary from './components/BoatnetSummary.vue';
import BoatnetTable from './components/BoatnetTable.vue';
import BoatnetTabPanel from './components/BoatnetTabPanel.vue';
import BoatnetTreeTable from './components/BoatnetTreeTable.vue';
import BoatnetLogin from './views/BoatnetLogin.vue';
import DefaultLayout from './layouts/Default.vue';
import BoatnetDatetimePrime from './components/BoatnetDatetimePrime.vue';
import 'primevue/resources/themes/nova-light/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';
const Components = {
    BoatnetAddSpeciesDialog,
    BoatnetButtonToggle,
    BoatnetButtonToggleComp,
    BoatnetCommonInputComponent,
    BoatnetCustomKeyboard,
    BoatnetDate,
    BoatnetDatetime,
    BoatnetWarningDialog,
    BoatnetTableComp,
    BoatnetInputDialog,
    BoatnetKeyboard,
    BoatnetKeyboardInput,
    BoatnetKeyboardList,
    BoatnetKeyboardSelect,
    BoatnetKeyboardSelectList,
    BoatnetList,
    BoatnetLocation,
    BoatnetLocations,
    BoatnetLogin,
    BoatnetSummary,
    BoatnetTable,
    BoatnetTabPanel,
    BoatnetTreeTable,
    DefaultLayout,
    BoatnetDatetimePrime
};
Object.keys(Components).forEach((name) => {
    Vue.component(name, Components[name]);
});
export * from './_store/';
export * from './helpers/trips-api';
export default Components;
//# sourceMappingURL=main.js.map