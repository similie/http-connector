import { IPermit } from '../model-interfaces';
import { LiveConnectionConstruct } from '../entities';
import { Model } from '../model-structures';
export declare class Permit extends Model<IPermit> {
    constructor(connector?: LiveConnectionConstruct);
}
