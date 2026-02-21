import { Router } from "express";
import {
  closeCashRegisterController,
  getActiveCashController,
  getCashRegisterController,
  openCashRegisterController,
} from "../controllers/cashRegister.controllers.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { openCashRegisterSchema } from "../schemas/schemasCashRegister/openCashRegister.schema.js";

const router = Router();

router.get("/caja/activa", getActiveCashController);
router.get("/caja/:id", getCashRegisterController);

router.post(
  "/caja/abrir",
  validateSchema(openCashRegisterSchema),
  openCashRegisterController,
);
router.post("/caja/cerrar", closeCashRegisterController);
export default router;
