import { ITracker } from '../model-interfaces';
import { LiveConnectionConstruct } from '../entities';
import { Model } from '../model-structures';
export declare class Tracker extends Model<ITracker> {
    constructor(connector?: LiveConnectionConstruct);
}
