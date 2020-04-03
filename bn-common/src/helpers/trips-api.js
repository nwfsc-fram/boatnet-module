import { authService } from '@boatnet/bn-auth';
import request from 'request';
import moment from 'moment';
const jwt = authService.getCurrentUser() ? authService.getCurrentUser().jwtToken : '';
const tripsApiBaseUrl = authService.getTripsApiUrl() ? authService.getTripsApiUrl() : '';
const tripsApiUrl = tripsApiBaseUrl + '/api/v1/trips';
const catchApiUrl = tripsApiBaseUrl + '/api/v1/tripCatch';
const cruiseApiUrl = tripsApiBaseUrl + '/api/v1/cruise';
export function getTripsApiTrips(query, queryValue) {
    let formattedQuery = '';
    if (query) {
        formattedQuery = '?' + query + '=' + queryValue;
    }
    return new Promise((resolve, reject) => {
        const queryUrl = tripsApiUrl + formattedQuery;
        request.get({
            url: queryUrl,
            json: true,
            headers: {
                authorization: 'Token ' + jwt
            }
        }, (err, response, body) => {
            if (!err && response.statusCode === 200) {
                resolve(body);
            }
            else {
                reject(response);
            }
        });
    });
}
export function getTripsApiTrip(tripNum) {
    return new Promise((resolve, reject) => {
        const queryUrl = tripsApiUrl + '/' + parseInt(tripNum, 10);
        request.get({
            url: queryUrl,
            json: true,
            headers: {
                authorization: 'Token ' + jwt
            }
        }, (err, response, body) => {
            if (!err && response.statusCode === 200) {
                resolve(body);
            }
            else {
                reject(err);
            }
        });
    });
}
export function getCatchApiCatch(tripNum) {
    return new Promise((resolve, reject) => {
        const queryUrl = catchApiUrl + '/' + parseInt(tripNum, 10);
        request.get({
            url: queryUrl,
            json: true,
            headers: {
                authorization: 'Token ' + jwt
            }
        }, (err, response, body) => {
            if (!err && response.statusCode === 200) {
                resolve(body);
            }
            else {
                reject(err);
            }
        });
    });
}
export function newCruiseApiTrip(newCruise) {
    return newDeployment(newCruise, cruiseApiUrl);
}
export function newTripsApiTrip(newTrip) {
    return newDeployment(newTrip, tripsApiUrl);
}
// calls newTrip or newCruise API
function newDeployment(deployment, url) {
    return new Promise((resolve, reject) => {
        request.post({
            url,
            json: true,
            headers: {
                authorization: 'Token ' + jwt,
            },
            body: deployment
        }, (err, response, body) => {
            if (!err && response.statusCode === 200) {
                resolve(body);
            }
            else {
                reject(err);
            }
        });
    });
}
export function updateTripsApiTrip(activeTrip) {
    return new Promise(async (resolve, reject) => {
        const tripsApiTrip = await getTripsApiTrip(activeTrip.tripNum);
        const queryUrl = tripsApiUrl + '/' + activeTrip.tripNum;
        if (!tripsApiTrip.changeLog) {
            tripsApiTrip.changeLog = [];
        }
        tripsApiTrip.changeLog.push({
            changedBy: authService.getCurrentUser().username,
            changedDate: moment().format(),
            previousDeparturePort: tripsApiTrip.departurePort,
            previousDepartureDate: tripsApiTrip.departureDate,
            previousReturnPort: tripsApiTrip.returnPort,
            previousReturnDate: tripsApiTrip.returnDate
        });
        tripsApiTrip.updatedBy = authService.getCurrentUser().username;
        tripsApiTrip.updatedDate = moment().format();
        tripsApiTrip.departurePort = activeTrip.departurePort;
        tripsApiTrip.departureDate = activeTrip.departureDate;
        tripsApiTrip.returnPort = activeTrip.returnPort;
        tripsApiTrip.returnDate = activeTrip.returnDate;
        request.put({
            url: queryUrl,
            json: true,
            headers: {
                authorization: 'Token ' + jwt,
            },
            body: tripsApiTrip
        }, (err, response, body) => {
            if (!err && response.statusCode === 200) {
                resolve(body);
            }
            else {
                reject(err);
            }
        });
    });
}
export function compareTrips(tripsApiTrip, currentTrip) {
    if (moment(tripsApiTrip.departureDate).isSame(currentTrip.departureDate, 'day')
        && moment(tripsApiTrip.returnDate).isSame(currentTrip.returnDate, 'day')
        && tripsApiTrip.vesselId === currentTrip.vesselId) {
        return true;
    }
    else {
        return false;
    }
}
//# sourceMappingURL=trips-api.js.map