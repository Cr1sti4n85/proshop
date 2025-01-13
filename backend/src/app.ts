import express, { Application } from "express";
import cors from "cors";
import { EnvConfiguration } from "./config/envConfig";
import "./config/db";

const PORT = EnvConfiguration().port;

const app: Application = express();

app.use(cors());

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
