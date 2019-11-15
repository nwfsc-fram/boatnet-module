import { test } from '@boatnet/bn-test-example';


describe('@boatnet/bn-test-example', () => {
    // Could perhaps check console output, but just runs this simple function.
    // https://medium.com/@the_teacher/how-to-test-console-output-console-log-console-warn-with-rtl-react-testing-library-and-jest-6df367736cf0

    it('basically works', () => {
      expect(test('testing')).toBeUndefined();
    });
  });
