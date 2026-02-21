import {
  createSaleFullServices,
  getSalesServices,
  annulSaleService,
  getProductSalesServices,
} from "../services/sales.services.js";
import { sendResponse } from "../utils/responseHandler.js";

export const createFullSaleController = async (req, res, next) => {
  try {
    const saleData = req.body;
    const createdSale = await createSaleFullServices(saleData);

    sendResponse(res, createdSale, "Venta registrada con éxito", true, 201);
  } catch (error) {
    next(error);
  }
};

export const getSalesController = async (req, res, next) => {
  try {
    const sales = await getSalesServices();
    sendResponse(res, sales, "Historial de ventas obtenido");
  } catch (error) {
    next(error);
  }
};

export const getVentaDetallesController = async (req, res, next) => {
  const { id } = req.params;

  try {
    const detalles = await getProductSalesServices(id);

    if (detalles.length === 0) {
      return res.status(404).json({ message: "No se encontraron detalles" });
    }

    sendResponse(res, detalles, "Detalles de la venta obtenidos");
  } catch (error) {
    next(error);
  }
};

export const annulSaleController = async (req, res, next) => {
  try {
    const { id } = req.params;
    await annulSaleService(id);
    sendResponse(res, null, "Venta anulada correctamente");
  } catch (error) {
    next(error);
  }
};
