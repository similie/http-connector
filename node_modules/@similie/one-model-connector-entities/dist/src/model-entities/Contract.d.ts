import { IContract } from '../model-interfaces';
import { LiveConnectionConstruct } from '../entities';
import { Model } from '../model-structures';
export declare class Contract extends Model<IContract> {
    constructor(connector?: LiveConnectionConstruct);
}
