import express, { Application } from "express";
import { router } from "./routes";
import cors from "cors";
import { errorHandler } from "./middlewares/errorHandler";
import swaggerUi from "swagger-ui-express";
import swaggerDocs from "./swagger.json";

const PORT = 8080;

const server: Application = express();
server.use(cors());
server.use(express.json());
server.use(router);

server.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

server.use(errorHandler);

if(process.env.NODE_ENV !== "test") {
  server.listen(PORT, () => console.log(`Server running at port ${PORT}`));
}

export default server;