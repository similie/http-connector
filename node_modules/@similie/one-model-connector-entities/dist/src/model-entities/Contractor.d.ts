import { IContractor } from '../model-interfaces';
import { LiveConnectionConstruct } from '../entities';
import { Model } from '../model-structures';
export declare class Contractor extends Model<IContractor> {
    constructor(connector?: LiveConnectionConstruct);
}
