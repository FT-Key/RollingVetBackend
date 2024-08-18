// Poblar la base de datos
import { postProductoService } from "../services/productos.service.js";
import { postUsuarioService } from "../services/usuarios.service.js";
import UserModel from "../models/usuario.schema.js";
import ProductModel from "../models/producto.schema.js";
import { usuarios } from "../mocks/usuarios.mock.js";
import { productos } from "../mocks/productos.mock.js";

export function poblarDB() {
  const inicializarProductos = async () => {
    try {
      const productosExistentes = await ProductModel.find();

      if (productosExistentes.length === 0) {
        for (const producto of productos) {
          const resultado = await postProductoService(producto);
          console.log(resultado.mensaje);
        }
        console.log("Productos iniciales creados con éxito.");
      } else {
        console.log("La base de datos ya contiene productos.");
      }
    } catch (error) {
      console.error("Error al inicializar productos:", error);
    }
  };

  const inicializarUsuarios = async () => {
    try {
      const usuariosExistentes = await UserModel.find();

      if (usuariosExistentes.length === 0) {
        for (const usuario of usuarios) {
          const resultado = await postUsuarioService(usuario);
          console.log(resultado.mensaje);
        }
        console.log("Usuarios iniciales creados con éxito.");
      } else {
        console.log("La base de datos ya contiene usuarios.");
      }
    } catch (error) {
      console.error("Error al inicializar usuarios:", error);
    }
  };

  inicializarUsuarios();
  inicializarProductos();
}
