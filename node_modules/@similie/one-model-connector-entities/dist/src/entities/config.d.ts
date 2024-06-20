/**
 * @interface
 * @name IModelConfigurationDetails
 * @description provides model configuration details for model instances.
 *  It offers the runtime connector details required to opperate a query to the
 *  static connector
 */
export interface IModelConfigurationDetails {
    url?: string;
    modelname?: string;
    database?: string;
    type?: string;
    port?: number;
    connection?: any;
}
/**
 * @interface
 * @name IModelConfiguration
 * @description we further extend so that our ConnectorConstructs
 *  require a means to obtaining the configuration details
 */
export interface IModelConfiguration {
    modelConfig: IModelConfigurationDetails;
}
