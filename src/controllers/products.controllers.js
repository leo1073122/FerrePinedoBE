import { getProductsService } from "../services/productos.services.js";


export const getProductsController = async (req,res) => {
    const products = await getProductsService();
    res.status(201).json(products);
}