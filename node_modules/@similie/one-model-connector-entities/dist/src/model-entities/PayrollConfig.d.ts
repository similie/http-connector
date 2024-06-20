import { IPayrollconfig } from '../model-interfaces';
import { LiveConnectionConstruct } from '../entities';
import { Model } from '../model-structures';
export declare class PayrollConfig extends Model<IPayrollconfig> {
    constructor(connector?: LiveConnectionConstruct);
}
