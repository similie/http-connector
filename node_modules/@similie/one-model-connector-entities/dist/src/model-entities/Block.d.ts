import { IBlock } from '../model-interfaces';
import { LiveConnectionConstruct } from '../entities';
import { Model } from '../model-structures';
export declare class Block extends Model<IBlock> {
    constructor(connector?: LiveConnectionConstruct);
}
