import { IUserallocation } from '../model-interfaces';
import { LiveConnectionConstruct } from '../entities';
import { Model } from '../model-structures';
export declare class UserAllocation extends Model<IUserallocation> {
    constructor(connector?: LiveConnectionConstruct);
}
