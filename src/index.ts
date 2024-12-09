export * from "./lib";
import {
  GlobalConnection,
  LiveConnectionConstruct,
} from "@similie/model-connect-entities";
import { HTTPConnector } from "./lib";

export function modelApiAgentSetGlobal(
  url: string = "",
  global: boolean = true,
  cors: boolean = true
): HTTPConnector {
  const connector = new HTTPConnector(url, global, cors);
  applyStaticLiveConnect(connector);
  return connector;
}

export const applyStaticLiveConnect = (connector: LiveConnectionConstruct) => {
  GlobalConnection.startInstance(connector);
};
