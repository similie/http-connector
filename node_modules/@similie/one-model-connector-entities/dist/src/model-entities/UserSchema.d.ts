import { IUserschema } from '../model-interfaces';
import { LiveConnectionConstruct } from '../entities';
import { Model } from '../model-structures';
export declare class UserSchema extends Model<IUserschema> {
    constructor(connector?: LiveConnectionConstruct);
}
