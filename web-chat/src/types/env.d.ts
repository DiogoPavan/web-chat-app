export type Env = {
  nodeEnv: string;
  appPort: number,
  databaseHost: string,
  databasePort: number,
  databaseUser: string,
  databasePassword: string,
  databaseName: string,
  authSecret?: string,
  botName?: string,
  redisPort?: number,
  redisHost?: string,
};
