import { IWorkorder } from '../model-interfaces';
import { LiveConnectionConstruct } from '../entities';
import { Model } from '../model-structures';
export declare class WorkOrder extends Model<IWorkorder> {
    constructor(connector?: LiveConnectionConstruct);
}
