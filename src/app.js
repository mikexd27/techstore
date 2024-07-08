import express from "express";
import morgan from "morgan"
import producto from "./routes/producto.routes";
import cliente from "./routes/cliente.routes";
import orden from "./routes/orden.routes";
import categoria from "./routes/categoria.routes";
import cors from "cors";

const app = express();

//Settings
app.set("port",4000);

//Middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

//Routes
app.use(producto);
app.use(cliente);
app.use(orden);
app.use(categoria);

export default app;
