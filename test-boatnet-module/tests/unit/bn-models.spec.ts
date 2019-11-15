import { WcgopOperation } from '@boatnet/bn-models';


describe('@boatnet/bn-models', () => {
    // Create a wcgop-operation to make sure models basically work
    it('allows creation of WcgopOperation', () => {
      let opTest : WcgopOperation = {
          type: 'wcgop-operation',
          floatsPerSegment: 2
      }
      expect(opTest).toHaveProperty('floatsPerSegment');
    });
  });
