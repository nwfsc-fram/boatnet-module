import { MeasurementDevice } from '../_lookups';

export interface Measurement {
  measurementDevice?: MeasurementDevice; // Lookup
  measurementType?: string; // TODO Lookup
  value?: number | string;
  units?: string;
}

export class MeasurementImpl implements Measurement {
  public measurementType: string;
  public units: string;

  constructor(measurementType: string, units: string) {
      this.measurementType = measurementType;
      this.units = units;
  }
}

export function initMeasurement(type: string, units: string): Measurement {
  return new MeasurementImpl(type, units);
}
