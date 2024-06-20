import { IActivity } from '../model-interfaces';
import { LiveConnectionConstruct } from '../entities';
import { Model } from '../model-structures';
export declare class Activity extends Model<IActivity> {
    constructor(connector?: LiveConnectionConstruct);
}
