import { IBatchmanager } from '../model-interfaces';
import { LiveConnectionConstruct } from '../entities';
import { Model } from '../model-structures';
export declare class BatchManager extends Model<IBatchmanager> {
    constructor(connector?: LiveConnectionConstruct);
}
