import { IStockcount } from '../model-interfaces';
import { LiveConnectionConstruct } from '../entities';
import { Model } from '../model-structures';
export declare class StockCount extends Model<IStockcount> {
    constructor(connector?: LiveConnectionConstruct);
}
