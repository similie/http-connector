import { IEarlywarning } from '../model-interfaces';
import { LiveConnectionConstruct } from '../entities';
import { Model } from '../model-structures';
export declare class EarlyWarning extends Model<IEarlywarning> {
    constructor(connector?: LiveConnectionConstruct);
}
