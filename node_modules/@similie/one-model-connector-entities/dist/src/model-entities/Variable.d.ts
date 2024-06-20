import { IVariable } from '../model-interfaces';
import { LiveConnectionConstruct } from '../entities';
import { Model } from '../model-structures';
export declare class Variable extends Model<IVariable> {
    constructor(connector?: LiveConnectionConstruct);
}
