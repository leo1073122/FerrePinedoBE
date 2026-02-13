import { Router } from "express";
import { getCashRegisterController,openCashRegisterController } from "../controllers/cashRegister.controllers.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { closeCashRegisterSchema } from "../schemas/schemasCashRegister/closeCashRegister.schema.js";
import { openCashRegisterSchema } from "../schemas/schemasCashRegister/openCashRegister.schema.js";

const router = Router();

router.get("/caja/:id", getCashRegisterController);
router.post("/caja/abrir", validateSchema(openCashRegisterSchema), openCashRegisterController);

export default router;
