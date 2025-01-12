import { loadEnvFile } from "process";
loadEnvFile();

const { PORT: port, NODE_ENV, MONGO_URI: mongoUri } = process.env;

export const EnvConfiguration = () => ({
  port,
  NODE_ENV,
  mongoUri,
});
