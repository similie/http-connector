import { IFileaccess } from '../model-interfaces';
import { LiveConnectionConstruct } from '../entities';
import { Model } from '../model-structures';
export declare class FileAccess extends Model<IFileaccess> {
    constructor(connector?: LiveConnectionConstruct);
}
