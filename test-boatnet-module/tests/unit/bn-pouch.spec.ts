// bn-pouch test suite [In Progress]

// Since this is running in node.js env (not in a browser) we get this error:
// ReferenceError: fetch is not defined

// The solution is to use the jest-fetch-mock npm package. https://www.npmjs.com/package/jest-fetch-mock#installation-and-setup
// Added to setupJest.js
import * as pouch from '@boatnet/bn-pouch';


describe('@boatnet/bn-pouch', () => {
  it('has a functional service', () => {
    const testService = pouch.pouchService
    expect(testService).toBeTruthy();
  });
});

// TODO: More tests