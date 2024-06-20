import { IPayroll } from '../model-interfaces';
import { LiveConnectionConstruct } from '../entities';
import { Model } from '../model-structures';
export declare class Payroll extends Model<IPayroll> {
    constructor(connector?: LiveConnectionConstruct);
}
