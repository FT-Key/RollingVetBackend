import ProductModel from "../models/producto.schema.js";

export const getProductosService = async () => {
  const productos = await ProductModel.find();
  return {
    productos,
    statusCode: 200,
  };
};

export const getProductoService = async (idProducto) => {
  const producto = await ProductModel.findOne({ _id: idProducto });

  if (producto) {
    return {
      producto,
      statusCode: 200,
    };
  } else {
    return {
      mensaje: "Producto no encontrado",
      statusCode: 404,
    };
  }
};

export const postProductoService = async (nuevoProductoData) => {

  const nuevoProducto = await ProductModel(nuevoProductoData);
  await nuevoProducto.save();

  return {
    mensaje: "Producto creado con éxito!",
    statusCode: 201,
    nuevoProducto,
  };
};

export const putProductoService = async (idProducto, productoData) => {

  const productoActualizado = await ProductModel.findOneAndUpdate(
    { _id: idProducto },
    productoData,
  );

  return {
    mensaje: "Producto actualizado",
    producto: productoActualizado,
    statusCode: 200,
  };
};

export const deleteProductoService = async (idProducto) => {

  await ProductModel.findByIdAndDelete({ _id: idProducto });

  return {
    mensaje: "Producto eliminado",
    statusCode: 200,
  };
};