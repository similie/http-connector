import { IEventdependent } from '../model-interfaces';
import { LiveConnectionConstruct } from '../entities';
import { Model } from '../model-structures';
export declare class EventDependent extends Model<IEventdependent> {
    constructor(connector?: LiveConnectionConstruct);
}
