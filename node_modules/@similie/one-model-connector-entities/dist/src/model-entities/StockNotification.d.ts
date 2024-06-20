import { IStocknotification } from '../model-interfaces';
import { LiveConnectionConstruct } from '../entities';
import { Model } from '../model-structures';
export declare class StockNotification extends Model<IStocknotification> {
    constructor(connector?: LiveConnectionConstruct);
}
