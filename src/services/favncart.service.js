// Carrito

export const addProductToCart = async (idUsuario, idProducto) => {
  let cart = await CartModel.findOne({ idUsuario });

  if (!cart) {
    cart = new CartModel({ idUsuario, productos: [idProducto] });
  } else {
    cart.productos.push(idProducto);
  }

  await cart.save();
  return cart.populate('productos');
};

export const removeProductFromCart = async (idUsuario, idProducto) => {
  const cart = await CartModel.findOne({ idUsuario });

  if (!cart) throw new Error('Carrito no encontrado');

  cart.productos = cart.productos.filter(product => product.toString() !== idProducto);

  await cart.save();
  return cart.populate('productos');
};

export const getCart = async (idUsuario) => {
  const cart = await CartModel.findOne({ idUsuario }).populate('productos');

  if (!cart) throw new Error('Carrito no encontrado');

  return cart;
};

// Favoritos

export const addProductToFav = async (idUsuario, idProducto) => {
  let fav = await FavModel.findOne({ idUsuario });

  if (!fav) {
    fav = new FavModel({ idUsuario, productos: [idProducto] });
  } else {
    fav.productos.push(idProducto);
  }

  await fav.save();
  return fav.populate('productos');
};

export const removeProductFromFav = async (idUsuario, idProducto) => {
  const fav = await FavModel.findOne({ idUsuario });

  if (!fav) throw new Error('Lista de favoritos no encontrada');

  fav.productos = fav.productos.filter(product => product.toString() !== idProducto);

  await fav.save();
  return fav.populate('productos');
};

export const getFav = async (idUsuario) => {
  const fav = await FavModel.findOne({ idUsuario }).populate('productos');

  if (!fav) throw new Error('Lista de favoritos no encontrada');

  return fav;
};