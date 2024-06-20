import { ICostrule } from '../model-interfaces';
import { LiveConnectionConstruct } from '../entities';
import { Model } from '../model-structures';
export declare class CostRule extends Model<ICostrule> {
    constructor(connector?: LiveConnectionConstruct);
}
