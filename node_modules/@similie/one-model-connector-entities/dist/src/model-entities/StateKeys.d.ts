import { IStatekeys } from '../model-interfaces';
import { LiveConnectionConstruct } from '../entities';
import { Model } from '../model-structures';
export declare class StateKeys extends Model<IStatekeys> {
    constructor(connector?: LiveConnectionConstruct);
}
