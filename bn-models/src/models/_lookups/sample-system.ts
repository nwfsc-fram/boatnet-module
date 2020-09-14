import { BaseLookup, Legacy } from '../_base';

export const SampleSystemTypeName = 'sample-system';

export interface SampleSystem extends BaseLookup {
  legacy?: SampleSystemLegacy;
}

interface SampleSystemLegacy extends Legacy {
  sampleSystemCode?: number;
}