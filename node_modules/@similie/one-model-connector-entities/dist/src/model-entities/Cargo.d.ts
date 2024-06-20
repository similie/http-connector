import { ICargo } from '../model-interfaces';
import { LiveConnectionConstruct } from '../entities';
import { Model } from '../model-structures';
export declare class Cargo extends Model<ICargo> {
    constructor(connector?: LiveConnectionConstruct);
}
