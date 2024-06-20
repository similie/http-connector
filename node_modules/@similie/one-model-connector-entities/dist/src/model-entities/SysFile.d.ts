import { ISysfile } from '../model-interfaces';
import { LiveConnectionConstruct } from '../entities';
import { Model } from '../model-structures';
export declare class SysFile extends Model<ISysfile> {
    constructor(connector?: LiveConnectionConstruct);
}
