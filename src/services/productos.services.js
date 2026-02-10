import { pool } from "../db.js";


export const getProductsService = async () => {
    const [products] = await pool.query("SELECT * FROM PRODUCTOS");
    return products;
}

