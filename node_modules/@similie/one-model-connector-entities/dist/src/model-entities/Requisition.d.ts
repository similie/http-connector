import { IRequisition } from '../model-interfaces';
import { LiveConnectionConstruct } from '../entities';
import { Model } from '../model-structures';
export declare class Requisition extends Model<IRequisition> {
    constructor(connector?: LiveConnectionConstruct);
}
