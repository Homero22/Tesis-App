import  express  from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import indexRoutes from "./routes/index.routes.js";


const app = express();

app.use(express.json());
whithList = [
    "https://localhost:4200",
    "https://tesis.ojedahomero.lol/"
];

app.use(cors({
    origin: withList,
    credentials: true
}));

app.use(cookieParser());

export default app;

app.use(indexRoutes);