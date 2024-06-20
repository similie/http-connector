import { ITelemetryevent } from '../model-interfaces';
import { LiveConnectionConstruct } from '../entities';
import { Model } from '../model-structures';
export declare class TelemetryEvent extends Model<ITelemetryevent> {
    constructor(connector?: LiveConnectionConstruct);
}
