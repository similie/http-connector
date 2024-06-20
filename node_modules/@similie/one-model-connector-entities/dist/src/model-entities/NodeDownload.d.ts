import { INodedownload } from '../model-interfaces';
import { LiveConnectionConstruct } from '../entities';
import { Model } from '../model-structures';
export declare class NodeDownload extends Model<INodedownload> {
    constructor(connector?: LiveConnectionConstruct);
}
