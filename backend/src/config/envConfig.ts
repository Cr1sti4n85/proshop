import { loadEnvFile } from "process";
loadEnvFile();

const { PORT: port, NODE_ENV } = process.env;

export const EnvConfiguration = () => ({
  port,
  NODE_ENV,
});
