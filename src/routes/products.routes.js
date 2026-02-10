import { Router } from "express";
import { getProductsController } from "../controllers/products.controllers.js";


const router = Router();


router.get("/productos", getProductsController);


export default router;