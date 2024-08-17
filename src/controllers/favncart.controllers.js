// Carrito
export const addProductToCart = async (req, res) => {
  try {
    const idUsuario = req.user._id;
    const { idProducto } = req.params; // Recibe el ID del producto de los parámetros de la URL
    const cart = await favncartService.addProductToCart(idUsuario, idProducto);
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const removeProductFromCart = async (req, res) => {
  try {
    const idUsuario = req.user._id;
    const { idProducto } = req.params; // Recibe el ID del producto de los parámetros de la URL
    const cart = await favncartService.removeProductFromCart(idUsuario, idProducto);
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCart = async (req, res) => {
  try {
    const idUsuario = req.user._id;
    const cart = await favncartService.getCart(idUsuario);
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Favoritos
export const addProductToFav = async (req, res) => {
  try {
    const idUsuario = req.user._id;
    const { idProducto } = req.params; // Recibe el ID del producto de los parámetros de la URL
    const fav = await favncartService.addProductToFav(idUsuario, idProducto);
    res.status(200).json(fav);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const removeProductFromFav = async (req, res) => {
  try {
    const idUsuario = req.user._id;
    const { idProducto } = req.params; // Recibe el ID del producto de los parámetros de la URL
    const fav = await favncartService.removeProductFromFav(idUsuario, idProducto);
    res.status(200).json(fav);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getFav = async (req, res) => {
  try {
    const idUsuario = req.user._id;
    const fav = await favncartService.getFav(idUsuario);
    res.status(200).json(fav);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};