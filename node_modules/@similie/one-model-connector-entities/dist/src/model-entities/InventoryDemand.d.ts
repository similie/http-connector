import { IInventorydemand } from '../model-interfaces';
import { LiveConnectionConstruct } from '../entities';
import { Model } from '../model-structures';
export declare class InventoryDemand extends Model<IInventorydemand> {
    constructor(connector?: LiveConnectionConstruct);
}
