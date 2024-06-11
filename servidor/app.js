import  express  from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import indexRoutes from "./routes/index.routes.js";




const app = express();
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'https://tesis.ojedahomero.lol');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });


app.use(express.json());
const whiteList = [
    "https://localhost:4200",
    "https://tesis.ojedahomero.lol/"
];

app.use(cors({
    origin: whiteList,
    credentials: true
}));

app.use(cookieParser());

export default app;
// Middleware para registrar cada solicitud
app.use((req, res, next) => {
    console.log(`Request Method: ${req.method}, Request URL: ${req.originalUrl}`);
    next(); // Continuar con la siguiente función de middleware o ruta
  });

app.use(indexRoutes);