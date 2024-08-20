import CartModel from "../models/carrito.schema.js";
import FavModel from "../models/favoritos.schema.js";

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
