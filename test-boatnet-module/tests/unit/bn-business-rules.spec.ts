import * as bizrules from '@boatnet/bn-business-rules';

describe('@boatnet/bn-business-rules/weightFromLength', () => {
    it('returns error on invalid pacfinSpeciesCode', () => {
      const result = bizrules.weightFromLength('blerg', 50);
      expect(result).toBe('species values unavailable.');
    });
  });

  describe('@boatnet/bn-business-rules/weightFromLength', () => {
    it('returns expected weight for "DOVR", 50', () => {
      const result = bizrules.weightFromLength('DOVR', 50);
      expect(result).toBe(2.9686104069651673);
    });
  });

  describe('@boatnet/bn-business-rules/weightfromSpeciesTotal', () => {
    it('returns totalWeight/count', () => {
      const result = bizrules.weightFromSpeciesTotal(2, 34);
      expect(result).toBe(17);
    });
  });
