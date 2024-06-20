import { IStationtelemetry } from '../model-interfaces';
import { LiveConnectionConstruct } from '../entities';
import { Model } from '../model-structures';
export declare class StationTelemetry extends Model<IStationtelemetry> {
    constructor(connector?: LiveConnectionConstruct);
}
