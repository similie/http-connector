import { IUsersession } from '../model-interfaces';
import { LiveConnectionConstruct } from '../entities';
import { Model } from '../model-structures';
export declare class UserSession extends Model<IUsersession> {
    constructor(connector?: LiveConnectionConstruct);
}
