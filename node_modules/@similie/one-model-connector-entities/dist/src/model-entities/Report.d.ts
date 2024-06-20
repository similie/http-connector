import { IReport } from '../model-interfaces';
import { LiveConnectionConstruct } from '../entities';
import { Model } from '../model-structures';
export declare class Report extends Model<IReport> {
    constructor(connector?: LiveConnectionConstruct);
}
