import { IStockfreeze } from '../model-interfaces';
import { LiveConnectionConstruct } from '../entities';
import { Model } from '../model-structures';
export declare class StockFreeze extends Model<IStockfreeze> {
    constructor(connector?: LiveConnectionConstruct);
}
