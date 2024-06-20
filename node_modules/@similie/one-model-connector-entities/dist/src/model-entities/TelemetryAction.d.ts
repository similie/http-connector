import { ITelemetryaction } from '../model-interfaces';
import { LiveConnectionConstruct } from '../entities';
import { Model } from '../model-structures';
export declare class TelemetryAction extends Model<ITelemetryaction> {
    constructor(connector?: LiveConnectionConstruct);
}
