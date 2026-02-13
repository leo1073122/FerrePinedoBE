import {
  getCashRegisterServices,
  openCashRegisterServices,
} from "../services/cashRegister.services.js";
import { sendResponse } from "../utils/responseHandler.js";

export const getCashRegisterController = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log(id)
    const CashRegister = await getCashRegisterServices(id);
    sendResponse(res, CashRegister, "Caja Encontrada");
  } catch (error) {
    next(error);
  }
};

export const openCashRegisterController = async (req, res, next) => {
  try {
    const openCashRegister = await openCashRegisterServices(req.body);
    sendResponse(res, openCashRegister, "Caja Abierta con exito");
  } catch (error) {
    next(error);
  }
};
