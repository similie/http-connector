import { IJobtemplate } from '../model-interfaces';
import { LiveConnectionConstruct } from '../entities';
import { Model } from '../model-structures';
export declare class JobTemplate extends Model<IJobtemplate> {
    constructor(connector?: LiveConnectionConstruct);
}
