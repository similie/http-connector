import { IPostransaction } from '../model-interfaces';
import { LiveConnectionConstruct } from '../entities';
import { Model } from '../model-structures';
export declare class PosTransaction extends Model<IPostransaction> {
    constructor(connector?: LiveConnectionConstruct);
}
