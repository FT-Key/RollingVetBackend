import {
  getProductosService,
  getProductoService,
  postProductoService,
  putProductoService,
  deleteProductoService
} from '../services/productos.services.js';

export const getProductos = async (req, res) => {
  try {
    const result = await getProductosService();
    if (result.statusCode === 200) {
      return res.status(200).json(result.productos);
    } else {
      return res.status(500).json({ msg: "Error al traer los productos." });
    }
  } catch (error) {
    return res.status(500).json({ msg: "Error interno del servidor." });
  }
};

export const getProducto = async (req, res) => {
  try {
    const idProducto = req.params.idProducto;
    const result = await getProductoService(idProducto);
    if (result.statusCode === 200) {
      return res.status(200).json(result.producto);
    } else {
      return res.status(404).json({ msg: result.mensaje });
    }
  } catch (error) {
    return res.status(500).json({ msg: "Error interno del servidor." });
  }
};

export const postProducto = async (req, res) => {
  try {
    const nuevoProductoData = req.body;
    const result = await postProductoService(nuevoProductoData);
    return res.status(result.statusCode).json({ msg: result.mensaje, nuevoProducto: result.nuevoProducto });
  } catch (error) {
    return res.status(500).json({ msg: "Error interno del servidor." });
  }
};

export const putProducto = async (req, res) => {
  try {
    const idProducto = req.params.idProducto;
    const productoData = req.body;
    const result = await putProductoService(idProducto, productoData);
    return res.status(result.statusCode).json({ msg: result.mensaje, producto: result.producto });
  } catch (error) {
    return res.status(500).json({ msg: "Error interno del servidor." });
  }
};

export const deleteProducto = async (req, res) => {
  try {
    const idProducto = req.params.idProducto;
    const result = await deleteProductoService(idProducto);
    return res.status(result.statusCode).json({ msg: result.mensaje });
  } catch (error) {
    return res.status(500).json({ msg: "Error interno del servidor." });
  }
};