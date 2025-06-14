import express from "express";
// import itemRoutes from './routes/itemRoutes';
import { errorHandler } from "./middlewares/errorhandler";
import helmet from "helmet";
import bodyParser from "body-parser";
import cors from "cors";
import { getEnv } from "./libs/getEnv";
import { routerMock } from "./routes/mock.route";

const app = express();

// Setup App
app.use(express.json());
app.set("trust proxy", true);
app.use(helmet());
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use(routerMock);

app.get("/", (req, res) => {
  res.send("Higo App Backend");
});

// Global error handler (should be after routes)
app.use(errorHandler);

export default app;
