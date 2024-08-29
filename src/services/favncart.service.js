import CartModel from "../models/carrito.schema.js";
import FavModel from "../models/favoritos.schema.js";
import ProductModel from "../models/producto.schema.js";
import { MercadoPagoConfig, Preference } from "mercadopago";

// Carrito

export const addProductToCartService = async (idUsuario, idProducto) => {
  let cart = await CartModel.findOne({ idUsuario });

  if (!cart) {
    cart = new CartModel({ idUsuario, productos: [idProducto] });
  } else {
    const productoExiste = cart.productos.some(prod => prod.toString() === idProducto.toString()); // Verifica si el producto ya existe en el carrito

    if (!productoExiste) {
      cart.productos.push(idProducto);
    }
  }

  await cart.save();
  return cart.populate("productos");
};

export const removeProductFromCartService = async (idUsuario, idProducto) => {
  const cart = await CartModel.findOne({ idUsuario });

  if (!cart) throw new Error("Carrito no encontrado");

  cart.productos = cart.productos.filter(
    (product) => product.toString() !== idProducto
  );

  await cart.save();
  return cart.populate("productos");
};

export const getCartService = async (idUsuario) => {
  const cart = await CartModel.findOne({ idUsuario }).populate("productos");

  if (!cart) throw new Error("Carrito no encontrado");

  return cart;
};

export const buyProductsService = async (productos) => {
  const cliente = new MercadoPagoConfig({
    accessToken: process.env.MP_ACCESS_TOKEN,
  });

  // Obtener los detalles de los productos desde la base de datos
  const items = await Promise.all(
    productos.map(async (prod) => {
      // Busca el producto en la base de datos usando su id
      const producto = await ProductModel.findById(prod.idProducto);
      
      if (!producto) {
        throw new Error(`Producto con id ${prod.idProducto} no encontrado`);
      }

      // Retorna el formato necesario para MercadoPago
      return {
        title: producto.name, // Asume que tu producto tiene un campo 'name'
        quantity: prod.cantidad,
        unit_price: producto.price, // Asume que tu producto tiene un campo 'price'
        currency_id: 'ARS', // Cambia según sea necesario
      };
    })
  );

  // Crear la preferencia en MercadoPago
  const preference = new Preference(cliente);

  const result = await preference.create({
    body: {
      items, // Utiliza el array dinámico de productos
      back_urls: {
        success: 'frontend/carrito/success',
        failure: 'frontend/carrito/failure',
        pending: 'frontend/carrito/pending',
      },
      auto_return: 'approved',
    }
  });

  return {
    url: result.init_point,
    statusCode: 200,
  };
};

// Favoritos

export const addProductToFavService = async (idUsuario, idProducto) => {
  let fav = await FavModel.findOne({ idUsuario });

  if (!fav) {
    fav = new FavModel({ idUsuario, productos: [idProducto] });
  } else {
    const productoExiste = fav.productos.some(prod => prod.toString() === idProducto.toString()); // Verifica si el producto ya existe en favoritos

    if (!productoExiste) {
      fav.productos.push(idProducto);
    }
  }

  await fav.save();
  return fav.populate("productos");
};

export const removeProductFromFavService = async (idUsuario, idProducto) => {
  const fav = await FavModel.findOne({ idUsuario });

  if (!fav) throw new Error("Lista de favoritos no encontrada");

  fav.productos = fav.productos.filter(
    (product) => product.toString() !== idProducto
  );

  await fav.save();
  return fav.populate("productos");
};

export const getFavService = async (idUsuario) => {
  const fav = await FavModel.findOne({ idUsuario }).populate("productos");

  if (!fav) throw new Error("Lista de favoritos no encontrada");

  return fav;
};
