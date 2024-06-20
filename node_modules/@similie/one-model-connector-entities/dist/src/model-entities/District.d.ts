import { IDistrict } from '../model-interfaces';
import { LiveConnectionConstruct } from '../entities';
import { Model } from '../model-structures';
export declare class District extends Model<IDistrict> {
    constructor(connector?: LiveConnectionConstruct);
}
