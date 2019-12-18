import { BaseLookup } from '../_base';

export const SampleSystemTypeName = 'sample-system';

export interface SampleSystem extends BaseLookup {
  legacy?: {
    sampleSystemCode?: number;
  };
}
