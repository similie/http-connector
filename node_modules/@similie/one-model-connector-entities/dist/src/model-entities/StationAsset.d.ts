import { IStationasset } from '../model-interfaces';
import { LiveConnectionConstruct } from '../entities';
import { Model } from '../model-structures';
export declare class StationAsset extends Model<IStationasset> {
    constructor(connector?: LiveConnectionConstruct);
}
