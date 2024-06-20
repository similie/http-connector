import { IWorkorderfile } from '../model-interfaces';
import { LiveConnectionConstruct } from '../entities';
import { Model } from '../model-structures';
export declare class WorkorderFile extends Model<IWorkorderfile> {
    constructor(connector?: LiveConnectionConstruct);
}
