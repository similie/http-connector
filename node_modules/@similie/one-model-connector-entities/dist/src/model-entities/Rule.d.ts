import { IRule } from '../model-interfaces';
import { LiveConnectionConstruct } from '../entities';
import { Model } from '../model-structures';
export declare class Rule extends Model<IRule> {
    constructor(connector?: LiveConnectionConstruct);
}
