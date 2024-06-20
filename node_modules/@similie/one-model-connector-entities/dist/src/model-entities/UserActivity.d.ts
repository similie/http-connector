import { IUseractivity } from '../model-interfaces';
import { LiveConnectionConstruct } from '../entities';
import { Model } from '../model-structures';
export declare class UserActivity extends Model<IUseractivity> {
    constructor(connector?: LiveConnectionConstruct);
}
