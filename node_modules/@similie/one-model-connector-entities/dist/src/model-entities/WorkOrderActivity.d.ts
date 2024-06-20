import { IWorkorderactivity } from '../model-interfaces';
import { LiveConnectionConstruct } from '../entities';
import { Model } from '../model-structures';
export declare class WorkOrderActivity extends Model<IWorkorderactivity> {
    constructor(connector?: LiveConnectionConstruct);
}
