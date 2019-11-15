import * as util from '@boatnet/bn-util';

describe('@boatnet/bn-util', () => {
  it('returns short formatted string', () => {
    const testShort = util.shortFormatDate('2019-01-01T00:00:00');
    expect(testShort).toMatch('01/01/19 00:00');
  });
});

describe('@boatnet/bn-util', () => {
  it('returns long formatted string', () => {
    const testShort = util.formatDate('2019-01-01T00:00:00');
    expect(testShort).toMatch('January 1, 2019 12:00 AM');
  });
});
