import { ISurveyuser } from '../model-interfaces';
import { LiveConnectionConstruct } from '../entities';
import { Model } from '../model-structures';
export declare class SurveyUser extends Model<ISurveyuser> {
    constructor(connector?: LiveConnectionConstruct);
}
