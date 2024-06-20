import { IDispatch } from '../model-interfaces';
import { LiveConnectionConstruct } from '../entities';
import { Model } from '../model-structures';
export declare class Dispatch extends Model<IDispatch> {
    constructor(connector?: LiveConnectionConstruct);
}
