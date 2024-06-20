import { IEventbroadcast } from '../model-interfaces';
import { LiveConnectionConstruct } from '../entities';
import { Model } from '../model-structures';
export declare class EventBroadcast extends Model<IEventbroadcast> {
    constructor(connector?: LiveConnectionConstruct);
}
