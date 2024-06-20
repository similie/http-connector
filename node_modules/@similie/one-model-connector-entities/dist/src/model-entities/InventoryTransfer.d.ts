import { IInventorytransfer } from '../model-interfaces';
import { LiveConnectionConstruct } from '../entities';
import { Model } from '../model-structures';
export declare class InventoryTransfer extends Model<IInventorytransfer> {
    constructor(connector?: LiveConnectionConstruct);
}
