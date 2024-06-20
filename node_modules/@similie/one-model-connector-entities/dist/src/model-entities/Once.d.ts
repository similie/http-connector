import { IOnce } from '../model-interfaces';
import { LiveConnectionConstruct } from '../entities';
import { Model } from '../model-structures';
export declare class Once extends Model<IOnce> {
    constructor(connector?: LiveConnectionConstruct);
}
