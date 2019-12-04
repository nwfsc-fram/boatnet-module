import * as auth from '@boatnet/bn-auth';
import { DBConfig } from '@boatnet/bn-couch';

describe('@boatnet/bn-auth', () => {
  it('has a functional service', () => {
    const testService = auth.authService
    expect(testService).toBeTruthy();
  });
});

describe('@boatnet/bn-auth', () => {
  it('allows us to specify apiUrl', () => {
    const testService = auth.authService
    expect(testService).toBeTruthy();

    const TEST_URL = 'https://localhost:1234';
    const dbConfig: DBConfig = {
      apiUrl: TEST_URL
    }
    expect( () => {
      testService.setDBConfig(dbConfig);
    }).not.toThrowError();

    expect(testService.apiUrl).toEqual(TEST_URL);
  });
});


// TODO: More tests