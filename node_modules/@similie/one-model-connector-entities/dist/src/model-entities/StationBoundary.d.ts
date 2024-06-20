import { IStationboundary } from '../model-interfaces';
import { LiveConnectionConstruct } from '../entities';
import { Model } from '../model-structures';
export declare class StationBoundary extends Model<IStationboundary> {
    constructor(connector?: LiveConnectionConstruct);
}
