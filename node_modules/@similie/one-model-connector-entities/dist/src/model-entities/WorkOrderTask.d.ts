import { IWorkordertask } from '../model-interfaces';
import { LiveConnectionConstruct } from '../entities';
import { Model } from '../model-structures';
export declare class WorkOrderTask extends Model<IWorkordertask> {
    constructor(connector?: LiveConnectionConstruct);
}
