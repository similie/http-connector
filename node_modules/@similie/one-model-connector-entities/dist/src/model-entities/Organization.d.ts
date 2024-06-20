import { IOrganization } from '../model-interfaces';
import { LiveConnectionConstruct } from '../entities';
import { Model } from '../model-structures';
export declare class Organization extends Model<IOrganization> {
    constructor(connector?: LiveConnectionConstruct);
}
