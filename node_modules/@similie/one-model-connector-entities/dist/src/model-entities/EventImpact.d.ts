import { IEventimpact } from '../model-interfaces';
import { LiveConnectionConstruct } from '../entities';
import { Model } from '../model-structures';
export declare class EventImpact extends Model<IEventimpact> {
    constructor(connector?: LiveConnectionConstruct);
}
