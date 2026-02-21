import { pool } from "../db.js";

export const getProductsService = async () => {
  const [products] = await pool.query("SELECT * FROM PRODUCTOS");
  return products;
};

export const getProductService = async (idProducto) => {
  const [product] = await pool.query(
    "SELECT * FROM PRODUCTOS WHERE id_producto = ?",
    [idProducto],
  );
  return product[0];
};

export const createProductService = async (newProduct) => {
  const { nombre, precio, unidad_medida, stock, activo } = newProduct;

  const [res] = await pool.query(
    "INSERT INTO productos (nombre,precio,unidad_medida,stock,activo) VALUES (?,?,?,?,?)",
    [nombre, precio, unidad_medida, stock, activo],
  );

  return {
    id_producto: res.insertId,
    ...newProduct,
  };
};

export const updateProductService = async (id, data) => {
  const fields = Object.keys(data)
    .map((field) => `${field} = ?`)
    .join(", ");

  const values = Object.values(data);

  if (!fields) {
    throw new Error("No hay campos para actualizar");
  }

  const [result] = await pool.query(
    `UPDATE PRODUCTOS SET ${fields} WHERE id_producto = ?`,
    [...values, id],
  );

  return result.affectedRows;
};

export const activateProductService = async (id) => {
  const [result] = await pool.query(
    "UPDATE PRODUCTOS SET activo = 1 where id_producto = ?",
    [id],
  );
  return result.affectedRows;
};


export const deleteProductService = async (id) => {
  const [result] = await pool.query(
    "UPDATE PRODUCTOS SET activo = 0 where id_producto = ?",
    [id],
  );
  return result.affectedRows;
};
