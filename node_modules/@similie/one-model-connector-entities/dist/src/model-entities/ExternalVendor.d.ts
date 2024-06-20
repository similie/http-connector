import { IExternalvendor } from '../model-interfaces';
import { LiveConnectionConstruct } from '../entities';
import { Model } from '../model-structures';
export declare class ExternalVendor extends Model<IExternalvendor> {
    constructor(connector?: LiveConnectionConstruct);
}
