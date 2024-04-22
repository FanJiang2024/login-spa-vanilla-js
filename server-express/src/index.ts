import express, { Express } from "express";
import dotenv from "dotenv";
import { simpleCors } from "./middlewares/simple-cors";
import https from "https";
import fs from "fs";
import path from "path";
import { apiV1 } from "./controllers/api_v1";

dotenv.config();

const options = {
  key: fs.readFileSync(path.join(__dirname, "../../.cert", "key.pem")),
  cert: fs.readFileSync(path.join(__dirname, "../../.cert", "cert.pem")),
};

const app: Express = express();
const port = process.env.PORT || 3000;

app.use("*", simpleCors);
app.use(express.json());

app.use("/api/v1", apiV1);

const server = https.createServer(options, app);
server.listen(port, () => {
  console.log(`[server]: Server is running at https://localhost:${port}`);
});
