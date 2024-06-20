import { IEws } from '../model-interfaces';
import { LiveConnectionConstruct } from '../entities';
import { Model } from '../model-structures';
export declare class EWS extends Model<IEws> {
    constructor(connector?: LiveConnectionConstruct);
}
