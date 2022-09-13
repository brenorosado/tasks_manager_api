import express from "express";
import { router } from "./routes";
import cors from "cors";
import { errorHandler } from "./middlewares/errorHandler";
import swaggerUi from "swagger-ui-express";
import swaggerDocs from "./swagger.json";

const PORT = 8080;

const app = express();
app.use(cors());
app.use(express.json());
app.use(router);

app.use("/documentation", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running at port ${PORT}`));