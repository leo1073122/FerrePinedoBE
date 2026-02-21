import { pool } from "../db.js";

export const createSaleFullServices = async ({
  id_caja,
  metodo_pago,
  detalles,
}) => {
  try {
    const [caja] = await pool.query(
      "SELECT estado FROM CAJA WHERE id_caja = ?",
      [id_caja],
    );
    if (!caja.length || caja[0].estado !== "ABIERTA") {
      throw {
        status: 400,
        message:
          "La caja no existe o no está cerrada. Debe abrirla para realizar ventas.",
      };
    }

    const idsProducts = detalles.map((d) => d.id_producto);
    if (idsProducts.length === 0)
      throw { status: 400, message: "No hay productos en la venta" };

    const [products] = await pool.query(
      "SELECT id_producto, nombre, precio, stock, activo FROM PRODUCTOS WHERE id_producto IN (?)",
      [idsProducts],
    );

    if (products.length !== idsProducts.length) {
      const foundIds = products.map((p) => p.id_producto);
      const missingIds = idsProducts.filter((id) => !foundIds.includes(id));
      throw {
        status: 404,
        message: `Productos no encontrados o inactivos: ${missingIds.join(", ")}`,
      };
    }

    const productsMap = new Map(products.map((p) => [p.id_producto, p]));

    let totalVenta = 0;
    const detallesParaInsertar = [];

    for (const detalle of detalles) {
      const product = productsMap.get(detalle.id_producto);

      if (!product.activo) {
        throw {
          status: 400,
          message: `El producto ${product.nombre} no está activo`,
        };
      }

      if (product.stock < detalle.cantidad) {
        throw {
          status: 400,
          message: `Stock insuficiente para ${product.nombre}. Disponible: ${product.stock}`,
        };
      }

      const subtotal = product.precio * detalle.cantidad;
      totalVenta += subtotal;

      detallesParaInsertar.push([
        null,
        detalle.id_producto,
        detalle.cantidad,
        product.precio,
        subtotal,
      ]);
    }

    const [ventaResult] = await pool.query(
      "INSERT INTO VENTAS (fecha, total, metodo_pago, id_caja) VALUES (NOW(), ?, ?, ?)",
      [totalVenta, metodo_pago, id_caja],
    );

    const idVenta = ventaResult.insertId;

    const bulkValues = detallesParaInsertar.map((d) => [
      idVenta,
      d[1],
      d[2],
      d[3],
      d[4],
    ]);

    if (bulkValues.length > 0) {
      await pool.query(
        "INSERT INTO DETALLE_VENTAS (id_venta, id_producto, cantidad, precio_unitario, subtotal) VALUES ?",
        [bulkValues],
      );
    }

    return {
      id_venta: idVenta,
      total: totalVenta,
      detalles: bulkValues.map((d) => ({
        id_producto: d[1],
        cantidad: d[2],
        precio_unitario: d[3],
        subtotal: d[4],
      })),
    };
  } catch (error) {
    await connection.rollback();
    throw error;
  }
};

export const getSalesServices = async () => {
  const [sales] = await pool.query("SELECT * FROM VENTAS ORDER BY fecha DESC");
  return sales;
};

export const getProductSalesServices = async (idVenta) => {
  const query = `
    SELECT 
      dv.id_detalle,
      dv.id_venta,
      dv.cantidad,
      dv.precio_unitario,
      p.nombre AS nombre_producto
    FROM detalle_ventas dv
    INNER JOIN productos p ON dv.id_producto = p.id_producto
    WHERE dv.id_venta = ?
  `;

  try {
    const [rows] = await pool.query(query, [idVenta]);
    return rows;
  } catch (error) {
    throw { status: 500, message: "Error al consultar la base de datos: " + error.message };
  }
};


export const annulSaleService = async (idVenta) => {
  // Primero verificamos si ya está anulada
  const [venta] = await pool.query("SELECT * FROM VENTAS WHERE id_venta = ?", [
    idVenta,
  ]);

  if (!venta.length) throw { status: 404, message: "Venta no encontrada" };
  if (venta[0].anulada)
    throw { status: 400, message: "La venta ya está anulada" };

  const [result] = await pool.query(
    "UPDATE VENTAS SET anulada = 1 WHERE id_venta = ?",
    [idVenta],
  );
  return result.affectedRows;
};
