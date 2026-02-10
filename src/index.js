

import express from "express";
import morgan from "morgan";
import productsRoutes from "./routes/products.routes.js"



const app = express();

app.use(morgan("dev"))
app.use(express.json())




app.use("/api", productsRoutes)


app.listen(3000, () => console.log("servidor corriendo 3000"));
