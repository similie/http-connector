import { IUseraccess } from '../model-interfaces';
import { LiveConnectionConstruct } from '../entities';
import { Model } from '../model-structures';
export declare class UserAccess extends Model<IUseraccess> {
    constructor(connector?: LiveConnectionConstruct);
}
