import { IStationidtracker } from '../model-interfaces';
import { LiveConnectionConstruct } from '../entities';
import { Model } from '../model-structures';
export declare class StationIdTracker extends Model<IStationidtracker> {
    constructor(connector?: LiveConnectionConstruct);
}
