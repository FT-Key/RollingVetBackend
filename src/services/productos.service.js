import cloudinary from "../helpers/cloudinary.config.js";
import ProductModel from "../models/producto.schema.js";

export const getProductosService = async (pagination = null) => {
  let productos;
  let totalProductos = await ProductModel.countDocuments();  // Obtener el total de productos
  
  if (pagination) {
    const { skip, limit } = pagination;
    productos = await ProductModel.find()
      .skip(skip)
      .limit(limit);
  } else {
    productos = await ProductModel.find();  // Si no hay paginación, traer todos los productos
  }

  return {
    productos,
    totalProductos,  // Retornar el total de productos en ambos casos
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

export const agregarImagenProductoService = async (idProducto, file) => {
  const producto = await ProductModel.findById(idProducto);
  const imagen = await cloudinary.uploader.upload(file.path);
  producto.imagenUrl = imagen.secure_url;
  if (!producto.imagenesUrls.includes(imagen.secure_url)) {
    producto.imagenesUrls.push(imagen.secure_url);
  }

  await producto.save();

  return {
    msg: 'Imagen cargada',
    statusCode: 200,
  }
};