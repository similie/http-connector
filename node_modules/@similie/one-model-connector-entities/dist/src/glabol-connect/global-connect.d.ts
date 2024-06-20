import { LiveConnectionConstruct } from "../entities";
export declare class GlobalConnection {
    private static instance;
    static readonly SET_GLOBAL = true;
    static readonly SET_LOCAL = false;
    connection: LiveConnectionConstruct;
    private constructor();
    static startInstance(Connector: LiveConnectionConstruct): GlobalConnection;
    static hasConnection(): boolean;
    static getInstance(): GlobalConnection;
    get connector(): LiveConnectionConstruct;
}
