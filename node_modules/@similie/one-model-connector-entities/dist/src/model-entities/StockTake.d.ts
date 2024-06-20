import { IStocktake } from '../model-interfaces';
import { LiveConnectionConstruct } from '../entities';
import { Model } from '../model-structures';
export declare class StockTake extends Model<IStocktake> {
    constructor(connector?: LiveConnectionConstruct);
}
