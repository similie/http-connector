import { IEventbatchlist } from '../model-interfaces';
import { LiveConnectionConstruct } from '../entities';
import { Model } from '../model-structures';
export declare class EventBatchList extends Model<IEventbatchlist> {
    constructor(connector?: LiveConnectionConstruct);
}
