import * as rules from '@boatnet/bn-rules';
import { BoatnetBaseRule } from '@boatnet/bn-rules';

describe('@boatnet/bn-rules', () => {
  it('has a functional service', () => {
    const testService = rules.rulesService;
    expect(testService).toBeTruthy();
  });
  it('loads default rules', () => {
    const testService = rules.rulesService;
    expect(testService.getRule('default-test').description).toEqual('For testing. Do not remove.');
    expect(testService.getRule('default-test').name).toEqual('Default: Test');
  });
});



// describe('@boatnet/bn-couch', () => {
//   it('throws the correct errors if not initialized', () => {
//     const testService = couch.couchService
//     expect(testService).toBeTruthy();

//     expect(() => {
//       const master = testService.masterDB();
//     }).toThrowError('Please log out');
//     expect(() => {
//       const lookups = testService.lookupsDB();
//     }).toThrowError('Please log out');
//     expect(() => {
//       const user = testService.userDB();
//     }).toThrowError('Please log out');
//   });
// });

// describe('@boatnet/bn-couch', () => {
//   it('returns not connected appropriately', () => {
//     const testService = couch.couchService
//     expect(testService).toBeTruthy();

//     expect(testService.isConnected).toEqual(false);
//   })
// });

// describe('@boatnet/bn-couch', () => {
//   it('can basically connect', () => {
//     const testService = couch.couchService
//     expect(testService).toBeTruthy();

//     // This will not actually connect.
//     const credentials: CouchDBCredentials = {
//       dbInfo: {
//         urlRoot: 'https://localhost:5984',
//         userDB: 'fake-user',
//         masterDB: 'fake-master',
//         lookupsDB: 'fake-lookups'
//       },
//       userCredentials: {
//         username: 'test',
//         password: 'test'
//       }
//     }
//     expect ( () => {
//       testService.connect(credentials)
//     }).not.toThrowError();
//     expect(testService.isConnected).toEqual(true);
//   })
// });
