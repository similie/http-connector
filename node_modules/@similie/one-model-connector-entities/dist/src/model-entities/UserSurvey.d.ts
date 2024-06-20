import { IUsersurvey } from '../model-interfaces';
import { LiveConnectionConstruct } from '../entities';
import { Model } from '../model-structures';
export declare class UserSurvey extends Model<IUsersurvey> {
    constructor(connector?: LiveConnectionConstruct);
}
