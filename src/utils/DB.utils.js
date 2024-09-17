import { postProductoService } from "../services/productos.service.js";
import { postUsuarioService } from "../services/usuarios.service.js";
import { postAnimalService } from "../services/animales.service.js"; // Asumiendo que tienes un servicio para animales
import UserModel from "../models/usuario.schema.js";
import ProductModel from "../models/producto.schema.js";
import AnimalModel from "../models/animal.schema.js"; // Asegúrate de tener el modelo para animales
import { usuarios } from "../mocks/usuarios.mock.js";
import { productos } from "../mocks/productos.mock.js";
import { animales } from "../mocks/animales.mock.js"; // Importar el array de animales
import { encryptPassword } from "./register.utils.js";

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
          // Encriptar la contraseña antes de guardar el usuario
          const hashedPassword = await encryptPassword(usuario.contrasenia);

          // Crear un nuevo objeto de usuario con la contraseña encriptada
          const usuarioContraseniaHasheada = {
            ...usuario,
            contrasenia: hashedPassword
          };

          // Llamar al servicio para crear el usuario con la contraseña hasheada
          const resultado = await postUsuarioService(usuarioContraseniaHasheada);
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

  const inicializarAnimales = async () => {
    try {
      const animalesExistentes = await AnimalModel.find();

      if (animalesExistentes.length === 0) {
        for (const animal of animales) {
          const resultado = await postAnimalService(animal);
          console.log(resultado.mensaje);
        }
        console.log("Animales iniciales creados con éxito.");
      } else {
        console.log("La base de datos ya contiene animales.");
      }
    } catch (error) {
      console.error("Error al inicializar animales:", error);
    }
  };

  inicializarUsuarios();
  inicializarProductos();
  inicializarAnimales();
}