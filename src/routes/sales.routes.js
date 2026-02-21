import { Router } from "express";
import {
  createFullSaleController,
  getSalesController,
  annulSaleController,
  getVentaDetallesController,
} from "../controllers/sales.controllers.js";

import { validateSchema } from "../middlewares/validateSchema.js";
import { salesSchema } from "../schemas/schemasSales/sales.schema.js";

const router = Router();

router.post("/ventas", validateSchema(salesSchema), createFullSaleController);
router.get("/ventas", getSalesController);
router.get("/ventas/:id/detalles", getVentaDetallesController);
router.delete("/ventas/:id", annulSaleController);

export default router;
