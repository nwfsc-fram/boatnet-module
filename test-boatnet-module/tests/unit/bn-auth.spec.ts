import * as auth from '@boatnet/bn-auth';

describe('@boatnet/bn-auth', () => {
  it('has a functional service', () => {
    const testService = auth.authService
    expect(testService).toBeTruthy();
  });
});

// TODO: More tests