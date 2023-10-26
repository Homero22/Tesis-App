import  express  from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import indexRoutes from "./routes/index.routes.js";


const app = express();

app.use(express.json());

app.use(cors({
    origin: "https://localhost:4200",
    credentials: true
}));

app.use(cookieParser());

export default app;

app.use(indexRoutes);