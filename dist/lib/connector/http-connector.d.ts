import { IEntity, IEntityPartial, IModelAttributes, IModelCollection, IModelConfigurationDetails, IQueryBaseType, IQueryLimiters, IQueryOrPartial, IValuesToEscape, LiveConnection } from "@similie/model-connect-entities";
import { IRawHttpQuery } from ".";
/**
 * @class
 * @name HTTPConnector
 * @description this class sets up and talks to the http adapter to
 *  talk the backend api
 * @param {string} apiVersion
 * @param {string} url
 * @param {boolean} global
 * @param {boolean} cors
 */
export declare class HTTPConnector extends LiveConnection {
    private _url;
    private _cors;
    private readonly CorsHeader;
    private _userContent;
    private httpConnection;
    constructor(_url?: string, global?: boolean, _cors?: boolean);
    /**
     * @name getApiRoute
     * @description returns the api route based on the model
     *   config
     * @param {IModelConfigurationDetails} modelConfig
     * @returns {string}
     */
    private getApiRoute;
    /**
     * @name stringAndEncodeObject
     * @description breaks
     * @param {any} values
     * @returns {string}
     */
    private stringAndEncodeObject;
    /**
     * @name populateAll
     * @description checks to see if we have a populate
     *   all request
     * @param {populateAll} limiters
     * @returns {boolean}
     */
    private populateAll;
    /**
     * @name buildPopulants
     * @description sets a populate query object
     *  into an array of strings
     * @param {IQueryLimiters} limiters
     * @returns {string[]}
     */
    private buildPopulants;
    /**
     * @name queryValues
     * @description takes a query object and convert it to a query string
     * @param {any} query
     * @param {IQueryLimiters} limiters
     * @returns {string}
     */
    private queryValues;
    /**
     * @private
     * @name appendQueryToUrl
     * @description appends the query to the url
     * @param {any} query
     * @param {IQueryLimiters} limiters
     * @param {string} url
     * @param {HttpMethod} method
     * @returns {string}
     */
    private appendQueryToUrl;
    /**
     * @get
     * @name localHeaders
     * @returns {RequestInit.headers}
     */
    private get localHeaders();
    /**
     * @private
     * @name appendCorsToConfig
     * @description allows us to append the cors header to the
     *   request config
     * @param {RequestInit} config
     * @returns {RequestInit}
     */
    private appendCorsToConfig;
    /**
     * @name setQueryData
     * @description Applies headers and any query details to the request
     * @param {any} query
     * @param {HttpMethod} method
     * @returns {RequestInit}
     */
    private setQueryData;
    /**
     * @name getRequestResults
     * @description wrapper around the httpConnection
     * @param {any} query
     * @param {IQueryLimiters} limiters
     * @param {string} url
     * @param {HttpMethod} method
     * @returns {Promise<Response>}
     */
    private getRequestResults;
    /**
     * @name buildStreamQuery
     * @descriptions builds a streaming query
     * @param  {any} query
     * @param {IQueryLimiters} limiters
     * @param {string} url
     * @param {HttpMethod} method
     * @param {function(string):Promise<void>} cb
     * @returns {Promise<{number;string;}>}
     */
    private buildStreamQuery;
    /**
     * @name buildQuery
     * @description builds an HTTP query and processes the results
     * @param {any} query
     * @param {IQueryLimiters} limiters
     * @param {string} url
     * @param {HttpMethod} method
     * @returns {Promise<any>}
     */
    private buildQuery;
    init(): Promise<void>;
    keys(): string[];
    tearDown(): Promise<void>;
    /**
     * @get
     * @description pulls the details of the active
     * user from session cookies or by setting
     * the content externally
     * @name userContent
     * @returns {Record<string, string>}
     */
    get userContent(): Record<string, string>;
    /**
     * @set
     * @name userContent
     * @param {Record<string, string>} userContent
     */
    set userContent(userContent: Record<string, string>);
    /**
     * @public
     * @name raw
     * @description gets the raw namespaced model
     * @param {IModelConfigurationDetails} modelConfig
     * @returns {IRawHttpQuery}
     */
    raw(modelConfig?: IModelConfigurationDetails): IRawHttpQuery;
    /**
     * @name findOne
     * @description finds a single record
     * @param {any} query
     * @param {IQueryLimiters} limiters {IQueryLimiters}
     * @param {IModelConfigurationDetails} modelConfig
     * @returns {Promise<IEntity>}
     */
    findOne(query: any, limiters: IQueryLimiters, modelConfig?: IModelConfigurationDetails): Promise<any>;
    /**
     * @public
     * @name find
     * @description sends back an a queried collection
     * @param {any} query
     * @param {IQueryLimiters} limiters
     * @param {IModelConfigurationDetails} modelConfig
     * @returns {Promise<IEntity[]>}
     */
    find(query: any, limiters: IQueryLimiters, modelConfig?: IModelConfigurationDetails): Promise<any>;
    /**
     * @public
     * @name save
     * @description saves a single record
     * @param {any} values
     * @param {IModelConfigurationDetails} modelConfig
     * @returns {Promise<IEntity>}
     */
    save(values: any, modelConfig?: IModelConfigurationDetails): Promise<any>;
    /**
     * @public
     * @name update
     * @description updates one or more records based on query
     * @param {any} query
     * @param {any} update
     * @param {IModelConfigurationDetails} modelConfig
     * @returns {Promise<IEntity[]>}
     */
    update(query: IQueryBaseType<IEntity>, update: any, modelConfig?: IModelConfigurationDetails): Promise<any>;
    /**
     * @public
     * @name count
     * @description model count for given query
     * @param {any} query
     * @param  {IModelConfigurationDetails} modelConfig
     * @returns {Promise<number>}
     */
    count(query: any, modelConfig?: IModelConfigurationDetails): Promise<any>;
    /**
     * @public
     * @name destroy
     * @description destroys a single record
     * @param  {number | IEntity} query
     * @param {IModelConfigurationDetails} modelConfig
     * @returns {Promise<IEntity>}
     */
    destroy(query: number | IEntityPartial<IEntity>, modelConfig?: IModelConfigurationDetails): Promise<any>;
    /**
     * @public
     * @name create
     * @description creates a single record
     * @param {Partial<IEntity>} query
     * @param {IModelConfigurationDetails} modelConfig
     * @returns {Promise<IEntity>}
     */
    create(query: IEntityPartial<IEntity>, modelConfig?: IModelConfigurationDetails): Promise<any>;
    /**
     * @public
     * @name createMany
     * @description creates a collection of records
     * @param {Partial<IEntity>[]} query
     * @param {IModelConfigurationDetails} modelConfig
     * @returns {Promise<IEntity[]>}
     */
    createMany(query: IEntityPartial<IEntity>[], modelConfig?: IModelConfigurationDetails): Promise<any>;
    /**
     * @public
     * @name destroyAll
     * @description destroys a collection of records
     * @param {IQueryBaseType} query
     * @param {IModelConfigurationDetails} modelConfig
     * @returns {Promise<IEntity[]>}
     */
    destroyAll(query: IQueryBaseType<IEntity>, modelConfig?: IModelConfigurationDetails): Promise<any>;
    /**
     * @public
     * @name add
     * @description adds a record to a collection
     * @param {any} value
     * @param {IModelConfigurationDetails} collection
     * @param {IModelConfigurationDetails} modelConfig
     * @returns {Promise<void>}
     */
    addToCollection(value: any, collection: IModelCollection<IEntity>): Promise<void | IEntity>;
    /**
     * @public
     * @name remove
     * @description removes a record to a collection
     * @param {any} value
     * @param {LiveConnectConfig} collection
     * @returns {Promise<void>}
     */
    removeFromCollection(value: any, collection: IModelCollection<IEntity>): Promise<void | IEntity>;
    /**
     * @public
     * @name attr
     * @description pulls the attributes for the model
     * @param {IModelConfigurationDetails} modelConfig
     * @returns {Promise<Record<string, IModelAttributes>>}
     */
    attr(modelConfig?: IModelConfigurationDetails): Promise<Record<string, IModelAttributes>>;
    /**
     * @public
     * @name sum
     * @description gets the average for numeric attributes
     *    assigned to a model
     * @param {Partial<IEntity>} numericAttrName keyof IEntity
     * @param {IQueryOrPartial<IEntity>} query
     * @param {IModelConfigurationDetails} modelConfig
     * @returns {Promise<ISumType>}
     */
    sum(numericAttrName: keyof IEntity, query?: IQueryOrPartial<IEntity>, modelConfig?: IModelConfigurationDetails): Promise<any>;
    /**
     * @public
     * @name avg
     * @description gets the average for numeric attributes
     *    assigned to a model
     * @param {Partial<IEntity>} numericAttrName keyof IEntity
     * @param {IQueryOrPartial<IEntity>} query  search query
     * @param {IModelConfigurationDetails} modelConfig
     * @returns {Promise<IAvgType>}
     */
    avg(numericAttrName: keyof IEntity, query?: IQueryOrPartial<IEntity>, modelConfig?: IModelConfigurationDetails): Promise<any>;
    /**
     * @public
     * @name streamBatch
     * @description streams the data as a batch. It takes the limiters option
     *    along with an eachBatch callback that chuncks the data into a stream
     * @param  {IEntity} query
     * @param {IQueryLimiters} limiters
     * @param {IModelConfigurationDetails} modelConfig
     * @param {function(model: IEntity):void | Promise<void>} cb
     * @returns {Promise<any>}
     */
    streamBatch(query: IQueryOrPartial<IEntity>, limiters: IQueryLimiters, modelConfig: IModelConfigurationDetails, cb: (model: IEntity[]) => void | Promise<void>): Promise<any>;
    /**
     * @public
     * @name streamEach
     * @description streams the data as a single record.
     *   It takes the limiters option along with an eachRecord
     *   callback that chuncks the data into a stream
     * @param {IEntity} query
     * @param {IQueryLimiters} limiters
     * @param {IModelConfigurationDetails} modelConfig
     * @param {function(model: IEntity):void | Promise<void>} cb
     * @returns {Promise<any>}
     */
    streamEach(query: IQueryOrPartial<IEntity>, limiters: IQueryLimiters, modelConfig: IModelConfigurationDetails, cb: (model: IEntity) => void | Promise<void>): Promise<any>;
    /**
     * @public
     * @name findOrCreate
     * @description searches for a record with a given criteria or creates a record
     *    should the search fail
     * @param {Partial<IEntity>} criteria
     * @param {Partial<IEntity>} initialValues
     * @param {IModelConfigurationDetails} modelConfig
     * @returns {Promise<IEntity>}
     */
    findOrCreate(criteria: IQueryOrPartial<IEntity>, initialValues: IEntityPartial<IEntity>, modelConfig?: IModelConfigurationDetails): Promise<any>;
    /**
     * @public
     * @name query
     * @description does a raw query to waterline. Waterline does not have
     * @param  {string} paramURL
     * @param {IValuesToEscape} valuesToEscape
     * @param {IModelConfigurationDetails} modelConfig
     * @returns {any} - the queried data
     */
    query(paramURL: string, valuesToEscape?: IValuesToEscape, modelConfig?: IModelConfigurationDetails): Promise<any>;
}
