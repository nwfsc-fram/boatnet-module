import { MeasurementDevice } from '../_lookups';

export interface Measurement {
  measurementDevice?: MeasurementDevice; // Lookup
  measurementType?: string; // TODO Lookup
  value?: number | string;
  units?: string;
}

export function initMeasurement(measurementType: string, units: string): Measurement {
  return {measurementType, units};
}
