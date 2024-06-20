import { IDomainrole } from '../model-interfaces';
import { LiveConnectionConstruct } from '../entities';
import { Model } from '../model-structures';
export declare class DomainRole extends Model<IDomainrole> {
    constructor(connector?: LiveConnectionConstruct);
}
