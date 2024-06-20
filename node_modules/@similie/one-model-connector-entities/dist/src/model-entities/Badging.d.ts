import { IBadging } from '../model-interfaces';
import { LiveConnectionConstruct } from '../entities';
import { Model } from '../model-structures';
export declare class Badging extends Model<IBadging> {
    constructor(connector?: LiveConnectionConstruct);
}
