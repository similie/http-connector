import { IUser } from '../model-interfaces';
import { LiveConnectionConstruct } from '../entities';
import { Model } from '../model-structures';
export declare class User extends Model<IUser> {
    constructor(connector?: LiveConnectionConstruct);
}
