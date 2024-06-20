import { IPointofsale } from '../model-interfaces';
import { LiveConnectionConstruct } from '../entities';
import { Model } from '../model-structures';
export declare class PointOfSale extends Model<IPointofsale> {
    constructor(connector?: LiveConnectionConstruct);
}
