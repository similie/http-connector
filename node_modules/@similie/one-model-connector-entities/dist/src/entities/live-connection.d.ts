import { IConnectorConnect } from './connector';
import { IModelConfiguration } from './config';
import { IEntity } from './base-entity';
/**
 * @interface
 * @name LiveConnectionConstruct
 * @description we merge the config details and the Connector properties
 *   to build the live connect construct. Other params can be added should
 *   they be required
 */
export interface LiveConnectionConstruct extends IModelConfiguration, IConnectorConnect<IEntity> {
}
