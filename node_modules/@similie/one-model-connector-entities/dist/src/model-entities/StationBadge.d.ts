import { IStationbadge } from '../model-interfaces';
import { LiveConnectionConstruct } from '../entities';
import { Model } from '../model-structures';
export declare class StationBadge extends Model<IStationbadge> {
    constructor(connector?: LiveConnectionConstruct);
}
