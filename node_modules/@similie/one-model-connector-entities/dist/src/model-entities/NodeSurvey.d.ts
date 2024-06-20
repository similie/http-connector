import { INodesurvey } from '../model-interfaces';
import { LiveConnectionConstruct } from '../entities';
import { Model } from '../model-structures';
export declare class NodeSurvey extends Model<INodesurvey> {
    constructor(connector?: LiveConnectionConstruct);
}
