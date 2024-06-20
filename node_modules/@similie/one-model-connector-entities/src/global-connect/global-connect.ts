import { LiveConnectionConstruct } from '../entities';

export class GlobalConnection {
  private static instance: GlobalConnection;
  public static readonly SET_GLOBAL = true;
  public static readonly SET_LOCAL = false;
  private connection: LiveConnectionConstruct;
  private constructor(Connector: LiveConnectionConstruct) {
    this.connection = Connector;
  }

  public static startInstance(
    Connector: LiveConnectionConstruct
  ): GlobalConnection {
    if (!GlobalConnection.instance) {
      GlobalConnection.instance = new GlobalConnection(Connector);
    }

    return GlobalConnection.instance;
  }

  public static hasConnection(): boolean {
    return !!GlobalConnection.instance;
  }

  public static getInstance(): GlobalConnection {
    if (!GlobalConnection.instance) {
      throw new Error('A connection has not been initialized');
    }
    return GlobalConnection.instance;
  }

  public get connector(): LiveConnectionConstruct {
    return this.connection;
  }
}
