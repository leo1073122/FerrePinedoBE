// BIBLIOTECAS
import express from "express";
import morgan from "morgan";

//RUTAS
import productsRoutes from "./routes/products.routes.js";
import cashRegisterRoutes from "./routes/cashRegister.routes.js";

// MANEJO DE ERRORES
import { errorHandler } from "./utils/errorsHandler.js";

const app = express();

app.use(morgan("dev"));
app.use(express.json());

app.use("/api", productsRoutes);
app.use("/api", cashRegisterRoutes);

app.use(errorHandler);

app.listen(process.env.PORT || 3000, () => console.log("Servidor corriendo"));
