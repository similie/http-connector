import { IVendorledger } from '../model-interfaces';
import { LiveConnectionConstruct } from '../entities';
import { Model } from '../model-structures';
export declare class VendorLedger extends Model<IVendorledger> {
    constructor(connector?: LiveConnectionConstruct);
}
