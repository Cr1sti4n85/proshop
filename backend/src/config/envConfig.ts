// import { loadEnvFile } from "process";
// loadEnvFile();

const {
  PORT: port,
  VITE_NODE_ENV: NODE_ENV,
  MONGO_URI: mongoUri,
  JWT_SECRET: jwtSecret,
  PAGINATION_LIMIT: pageSize = 2,
} = process.env;

export const EnvConfiguration = () => ({
  port,
  NODE_ENV,
  mongoUri,
  jwtSecret,
  pageSize,
});
