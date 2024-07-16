/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ALL_POPULANTS,
  IEntity,
  IEntityPartial,
  IModelAttributes,
  IModelConfigurationDetails,
  IQueryBaseType,
  IQueryLimiters,
  IQueryOrPartial,
  IValuesToEscape,
  LiveConnection,
  ModelCollection,
} from "@similie/one-model-connector-entities";
import {
  HttpMethod,
  HttpConnection,
  IRawHttpQuery,
  pullCookieValueInBrowser,
  AUTHENTICATION_TOKEN_COOKIE,
} from ".";

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
export class HTTPConnector extends LiveConnection {
  private readonly CorsHeader: Partial<RequestInit> = {
    // mode: 'cors',
    headers: {
      //   'Access-Control-Allow-Origin': '*',
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };

  private _userContent: Record<string, string> = {};
  private httpConnection: HttpConnection;
  public constructor(
    private _url: string = "",
    global: boolean = true,
    private _cors: boolean = true,
  ) {
    super(global);
    this.httpConnection = new HttpConnection(this._cors);
  }

  /**
   * @name getApiRoute
   * @description returns the api route based on the model
   *   config
   * @param {IModelConfigurationDetails} modelConfig
   * @returns {string}
   */
  private getApiRoute(modelConfig?: IModelConfigurationDetails): string {
    if (!modelConfig) {
      throw new Error("Model configuration details are required");
    }
    return `${this._url}${modelConfig.modelname}/`;
  }

  /**
   * @name stringAndEncodeObject
   * @description breaks
   * @param {any} values
   * @returns {string}
   */
  private stringAndEncodeObject(values: any) {
    if (!Object.keys(values).length) {
      return "";
    }
    const stringValue = JSON.stringify(values);
    return encodeURIComponent(stringValue);
  }

  /**
   * @name populateAll
   * @description checks to see if we have a populate
   *   all request
   * @param {populateAll} limiters
   * @returns {boolean}
   */
  private populateAll(limiters: IQueryLimiters) {
    return (
      typeof limiters.populate === "string" &&
      limiters.populate === ALL_POPULANTS
    );
  }

  /**
   * @name buildPopulants
   * @description sets a populate query object
   *  into an array of strings
   * @param {IQueryLimiters} limiters
   * @returns {string[]}
   */
  private buildPopulants(limiters: IQueryLimiters) {
    if (this.populateAll(limiters)) {
      return ["*"];
    }
    return Object.keys(limiters.populate || []);
  }

  /**
   * @name queryValues
   * @description takes a query object and convert it to a query string
   * @param {any} query
   * @param {IQueryLimiters} limiters
   * @returns {string}
   */
  private queryValues(query: any = {}, limiters: IQueryLimiters) {
    const queryString = [];
    if (Object.keys(query).length) {
      queryString.push(`where=${this.stringAndEncodeObject(query)}`);
    }

    if (limiters.limit) {
      queryString.push(`limit=${limiters.limit}`);
    }

    if (limiters.skip) {
      queryString.push(`skip=${limiters.skip}`);
    }

    if (limiters.sort && Object.keys(limiters.sort).length) {
      queryString.push(`sort=${this.stringAndEncodeObject(limiters.sort)}`);
    }

    if (limiters.populate) {
      queryString.push(
        `populate=${this.stringAndEncodeObject(this.buildPopulants(limiters))}`,
      );
    }

    if (!queryString.length) {
      return "";
    }

    return "?" + queryString.join("&"); // this.encodeQueryURI(queryString.join('&'));
  }

  /**
   *
   * @param {any} query
   * @param {IQueryLimiters} limiters
   * @param {string} url
   * @param {HttpMethod} method
   * @returns {string}
   */
  private appendQueryToUrl(
    query: any,
    limiters: IQueryLimiters,
    url: string,
    method: HttpMethod,
  ) {
    if (method !== HttpMethod.GET) {
      return url;
    }
    const queryString = this.queryValues(query, limiters);
    return url + queryString;
  }

  /**
   * @get
   * @name localHeaders
   * @returns {RequestInit.headers}
   */
  private get localHeaders() {
    return Object.assign(
      this.CorsHeader.headers as Record<string, string>,
      this.userContent,
    );
  }

  /**
   * @private
   * @name appendCorsToConfig
   * @description allows us to append the cors header to the
   *   request config
   * @param {RequestInit} config
   * @returns {RequestInit}
   */
  private appendCorsToConfig(config: RequestInit = {}): RequestInit {
    if (!this._cors) {
      return config;
    }
    const configHeaders = config.headers || {};
    return {
      ...config,
      mode: this.CorsHeader.mode,
      headers: Object.assign(configHeaders, this.localHeaders),
    };
  }

  /**
   * @name setQueryData
   * @description Applies headers and any query details to the request
   * @param {any} query
   * @param {HttpMethod} method
   * @returns {RequestInit}
   */
  private setQueryData(query: any, method: HttpMethod) {
    if (method === HttpMethod.GET) {
      return this.appendCorsToConfig({});
    }
    return this.appendCorsToConfig({
      body: JSON.stringify(query),
      method: method,
    });
  }

  /**
   * @name getRequestResults
   * @description wrapper around the httpConnection
   * @param {any} query
   * @param {IQueryLimiters} limiters
   * @param {string} url
   * @param {HttpMethod} method
   * @returns {Promise<Response>}
   */
  private getRequestResults(
    query: any,
    limiters: IQueryLimiters,
    url: string,
    method: HttpMethod,
  ) {
    return this.httpConnection.send(
      this.appendQueryToUrl(query, limiters, url, method),
      this.setQueryData(query, method),
    );
  }

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
  private async buildStreamQuery(
    query: any,
    limiters: IQueryLimiters,
    url: string,
    method: HttpMethod,
    cb: (chunk: string) => Promise<void>,
  ) {
    const results = await this.getRequestResults(query, limiters, url, method);
    return this.httpConnection.fetchStreamData(results, cb);
  }

  /**
   * @name buildQuery
   * @description builds an HTTP query and processes the results
   * @param {any} query
   * @param {IQueryLimiters} limiters
   * @param {string} url
   * @param {HttpMethod} method
   * @returns {Promise<any>}
   */
  private async buildQuery(
    query: any,
    limiters: IQueryLimiters,
    url: string,
    method: HttpMethod,
  ) {
    const results = await this.getRequestResults(query, limiters, url, method);
    if (!results.ok) {
      console.error("HTTP Response error", results.status, results.statusText);
      throw new Error(results.statusText);
    }

    if (results.statusText === "No Content") {
      return null;
    }

    try {
      return results.json();
    } catch {
      return results.text();
    }
  }

  ////////////
  // Public //
  ////////////

  /**
   * @get
   * @description pulls the details of the active
   * user from session cookies or by setting
   * the content externally
   * @name userContent
   * @returns {Record<string, string>}
   */
  public get userContent() {
    if (!Object.keys(this._userContent).length) {
      const authToken = pullCookieValueInBrowser(AUTHENTICATION_TOKEN_COOKIE);

      authToken &&
        Object.assign(this._userContent, {
          authentication: `Bearer ${authToken}`,
        });
    }
    return this._userContent || {};
  }

  /**
   * @set
   * @name userContent
   * @param {Record<string, string>} userContent
   */
  public set userContent(userContent: Record<string, string>) {
    this._userContent = userContent;
  }

  /**
   * @public
   * @name raw
   * @description gets the raw namespaced model
   * @param {IModelConfigurationDetails} modelConfig
   * @returns {IRawHttpQuery}
   */
  public override raw(modelConfig?: IModelConfigurationDetails): IRawHttpQuery {
    const url = this.getApiRoute(modelConfig);
    return {
      url,
      http: this.httpConnection,
    };
  }

  /**
   * @name findOne
   * @description finds a single record
   * @param {any} query
   * @param {IQueryLimiters} limiters {IQueryLimiters}
   * @param {IModelConfigurationDetails} modelConfig
   * @returns {Promise<IEntity>}
   */
  public override async findOne(
    query: any,
    limiters: IQueryLimiters,
    modelConfig?: IModelConfigurationDetails,
  ) {
    const hasId =
      query.id && !Array.isArray(query.id) && Object.keys(query).length === 1;
    const sendQuery = { ...query };
    if (hasId) {
      delete sendQuery.id;
    }
    const url = this.getApiRoute(modelConfig) + (hasId ? query.id : "");
    const results = await this.buildQuery(
      sendQuery,
      limiters,
      url,
      HttpMethod.GET,
    );
    return Array.isArray(results) ? results[0] : results;
  }

  /**
   * @public
   * @name find
   * @description sends back an a queried collection
   * @param {any} query
   * @param {IQueryLimiters} limiters
   * @param {IModelConfigurationDetails} modelConfig
   * @returns {Promise<IEntity[]>}
   */
  public override find(
    query: any,
    limiters: IQueryLimiters,
    modelConfig?: IModelConfigurationDetails,
  ) {
    const url = this.getApiRoute(modelConfig);
    return this.buildQuery(query, limiters, url, HttpMethod.GET);
  }

  /**
   * @public
   * @name save
   * @description saves a single record
   * @param {any} values
   * @param {IModelConfigurationDetails} modelConfig
   * @returns {Promise<IEntity>}
   */
  public override async save(
    values: any,
    modelConfig?: IModelConfigurationDetails,
  ) {
    const id = this.getId(values);
    if (!id) {
      throw new Error(
        `A saved model must contain and ID form this ${modelConfig?.modelname}`,
      );
    }
    const url = this.getApiRoute(modelConfig) + id;
    return this.buildQuery(values, {}, url, HttpMethod.PUT);
  }

  /**
   * @public
   * @name update
   * @description updates one or more records based on query
   * @param {any} query
   * @param {any} update
   * @param {IModelConfigurationDetails} modelConfig
   * @returns {Promise<IEntity[]>}
   */
  public override async update(
    query: IQueryBaseType<IEntity>,
    update: any,
    modelConfig?: IModelConfigurationDetails,
  ) {
    const url = this.getApiRoute(modelConfig);
    return this.buildQuery(
      {
        query,
        update,
      },
      {},
      url,
      HttpMethod.PUT,
    );
  }

  /**
   * @public
   * @name count
   * @description model count for given query
   * @param {any} query
   * @param  {IModelConfigurationDetails} modelConfig
   * @returns {Promise<number>}
   */
  public override async count(
    query: any,
    modelConfig?: IModelConfigurationDetails,
  ) {
    const url = this.getApiRoute(modelConfig) + "count";
    return this.buildQuery(query, {}, url, HttpMethod.GET);
  }

  /**
   * @public
   * @name destroy
   * @description destroys a single record
   * @param  {number | IEntity} query
   * @param {IModelConfigurationDetails} modelConfig
   * @returns {Promise<IEntity>}
   */
  public override async destroy(
    query: number | IEntityPartial<IEntity>,
    modelConfig?: IModelConfigurationDetails,
  ) {
    const id = this.getId(query);
    if (!id) {
      throw new Error(
        `A saved model must contain and ID form this ${modelConfig!.modelname}`,
      );
    }
    const url = this.getApiRoute(modelConfig) + id;
    return this.buildQuery({}, {}, url, HttpMethod.DELETE);
  }

  /**
   * @public
   * @name create
   * @description creates a single record
   * @param {Partial<IEntity>} query
   * @param {IModelConfigurationDetails} modelConfig
   * @returns {Promise<IEntity>}
   */
  public override async create(
    query: IEntityPartial<IEntity>,
    modelConfig?: IModelConfigurationDetails,
  ) {
    const url = this.getApiRoute(modelConfig);
    return this.buildQuery(query, {}, url, HttpMethod.POST);
  }

  /**
   * @public
   * @name createMany
   * @description creates a collection of records
   * @param {Partial<IEntity>[]} query
   * @param {IModelConfigurationDetails} modelConfig
   * @returns {Promise<IEntity[]>}
   */
  public override async createMany(
    query: IEntityPartial<IEntity>[],
    modelConfig?: IModelConfigurationDetails,
  ) {
    const url = this.getApiRoute(modelConfig);
    return this.buildQuery(query, {}, url, HttpMethod.POST);
  }

  /**
   * @public
   * @name destroyAll
   * @description destroys a collection of records
   * @param {IQueryBaseType} query
   * @param {IModelConfigurationDetails} modelConfig
   * @returns {Promise<IEntity[]>}
   */
  public override async destroyAll(
    query: IQueryBaseType<IEntity>,
    modelConfig?: IModelConfigurationDetails,
  ) {
    const url = this.getApiRoute(modelConfig);
    return this.buildQuery(query, {}, url, HttpMethod.DELETE);
  }

  /**
   * @public
   * @name add
   * @description adds a record to a collection
   * @param {any} value
   * @param {IModelConfigurationDetails} collection
   * @param {IModelConfigurationDetails} modelConfig
   * @returns {Promise<void>}
   */
  public override async addToCollection(
    value: any,
    collection: ModelCollection<IEntity>,
  ): Promise<void | IEntity> {
    const modelConfig: IModelConfigurationDetails = {
      modelname: collection.model,
    };
    const url =
      this.getApiRoute(modelConfig) +
      `${collection.instance}/${collection.name}/${this.getId(value)}`;
    return this.buildQuery({}, {}, url, HttpMethod.PUT);
  }

  /**
   * @public
   * @name remove
   * @description removes a record to a collection
   * @param {any} value
   * @param {LiveConnectConfig} collection
   * @returns {Promise<void>}
   */
  public override async removeFromCollection(
    value: any,
    collection: ModelCollection<IEntity>,
  ): Promise<void | IEntity> {
    const modelConfig: IModelConfigurationDetails = {
      modelname: collection.model,
    };
    const url =
      this.getApiRoute(modelConfig) +
      `${collection.instance}/${collection.name}/${this.getId(value)}`;
    return this.buildQuery({}, {}, url, HttpMethod.DELETE);
  }

  /**
   * @public
   * @name attr
   * @description pulls the attributes for the model
   * @param {IModelConfigurationDetails} modelConfig
   * @returns {Promise<Record<string, IModelAttributes>>}
   */
  public override attr(
    modelConfig?: IModelConfigurationDetails,
  ): Promise<Record<string, IModelAttributes>> {
    const url = this.getApiRoute(modelConfig) + "schema";
    return this.buildQuery({}, {}, url, HttpMethod.GET);
  }

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
  public override async sum(
    numericAttrName: keyof IEntity,
    query?: IQueryOrPartial<IEntity>,
    modelConfig?: IModelConfigurationDetails,
  ) {
    const url = this.getApiRoute(modelConfig) + `sum/${numericAttrName}`;
    return this.buildQuery(query, {}, url, HttpMethod.GET);
  }

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
  public override async avg(
    numericAttrName: keyof IEntity,
    query?: IQueryOrPartial<IEntity>,
    modelConfig?: IModelConfigurationDetails,
  ) {
    const url = this.getApiRoute(modelConfig) + `avg/${numericAttrName}`;
    return this.buildQuery(query, {}, url, HttpMethod.GET);
  }

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
  public override async streamBatch(
    query: IQueryOrPartial<IEntity>,
    limiters: IQueryLimiters,
    modelConfig: IModelConfigurationDetails,
    cb: (model: IEntity[]) => void | Promise<void>,
  ): Promise<any> {
    const url =
      this.getApiRoute(modelConfig) + "stream-batch/" + limiters.batchNumber;
    return await this.buildStreamQuery(
      query,
      limiters,
      url,
      HttpMethod.GET,
      async (chunk: string) => {
        try {
          const values = JSON.parse(chunk) as IEntity[];
          await cb(values);
        } catch {
          //
        }
      },
    );
  }

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
  public override async streamEach(
    query: IQueryOrPartial<IEntity>,
    limiters: IQueryLimiters,
    modelConfig: IModelConfigurationDetails,
    cb: (model: IEntity) => void | Promise<void>,
  ): Promise<any> {
    const url = this.getApiRoute(modelConfig) + "stream";
    return await this.buildStreamQuery(
      query,
      limiters,
      url,
      HttpMethod.GET,
      async (chunk: string) => {
        try {
          const value = JSON.parse(chunk) as IEntity;
          await cb(value);
        } catch {
          //
        }
      },
    );
  }

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
  public override async findOrCreate(
    criteria: IQueryOrPartial<IEntity>,
    initialValues: IEntityPartial<IEntity>,
    modelConfig?: IModelConfigurationDetails,
  ) {
    const url = this.getApiRoute(modelConfig) + "seek";
    return this.buildQuery(
      {
        criteria,
        initialValues,
      },
      {},
      url,
      HttpMethod.POST,
    );
  }

  /**
   * @public
   * @name query
   * @description does a raw query to waterline. Waterline does not have
   * @param  {string} paramURL
   * @param {IValuesToEscape} valuesToEscape
   * @param {IModelConfigurationDetails} modelConfig
   * @returns {any} - the queried data
   */
  public override async query(
    paramURL: string,
    valuesToEscape?: IValuesToEscape,
    modelConfig?: IModelConfigurationDetails,
  ) {
    const url = modelConfig
      ? this.getApiRoute(modelConfig) + paramURL
      : paramURL;
    const [payload, method] = valuesToEscape || [];
    const sendPayload = payload || {};
    const sendMethod = method || HttpMethod.GET;
    const query = sendMethod === HttpMethod.GET ? sendPayload : sendPayload;
    return this.buildQuery(sendPayload, query, url, sendMethod);
  }
}
