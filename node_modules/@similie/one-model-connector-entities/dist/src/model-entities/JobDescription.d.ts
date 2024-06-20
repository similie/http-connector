import { IJobdescription } from '../model-interfaces';
import { LiveConnectionConstruct } from '../entities';
import { Model } from '../model-structures';
export declare class JobDescription extends Model<IJobdescription> {
    constructor(connector?: LiveConnectionConstruct);
}
