import { IUserlicense } from '../model-interfaces';
import { LiveConnectionConstruct } from '../entities';
import { Model } from '../model-structures';
export declare class UserLicense extends Model<IUserlicense> {
    constructor(connector?: LiveConnectionConstruct);
}
