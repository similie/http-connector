import { IManager } from '../model-interfaces';
import { LiveConnectionConstruct } from '../entities';
import { Model } from '../model-structures';
export declare class Manager extends Model<IManager> {
    constructor(connector?: LiveConnectionConstruct);
}
