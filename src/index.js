// BIBLIOTECAS
import express from "express";
import morgan from "morgan";
import cors from "cors";

//RUTAS
import productsRoutes from "./routes/products.routes.js";
import cashRegisterRoutes from "./routes/cashRegister.routes.js";
import salesRoutes from "./routes/sales.routes.js";
import expensesRoutes from "./routes/expenses.routes.js";

// MANEJO DE ERRORES
import { errorHandler } from "./utils/errorsHandler.js";

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

app.use("/api", productsRoutes);
app.use("/api", cashRegisterRoutes);
app.use("/api", salesRoutes);
app.use("/api", expensesRoutes);

app.use(errorHandler);

app.listen(process.env.PORT);
