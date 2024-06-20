import { IStatechain } from '../model-interfaces';
import { LiveConnectionConstruct } from '../entities';
import { Model } from '../model-structures';
export declare class StateChain extends Model<IStatechain> {
    constructor(connector?: LiveConnectionConstruct);
}
