import { IPurchaseorder } from '../model-interfaces';
import { LiveConnectionConstruct } from '../entities';
import { Model } from '../model-structures';
export declare class PurchaseOrder extends Model<IPurchaseorder> {
    constructor(connector?: LiveConnectionConstruct);
}
