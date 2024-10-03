import { postProductoService } from "../services/productos.service.js";
import { postUsuarioService } from "../services/usuarios.service.js";
import { postAnimalService } from "../services/animales.service.js"; // Asumiendo que tienes un servicio para animales
import { postComentarioService } from "../services/comentarios.service.js"; // Asumiendo que tienes un servicio para comentarios
import UserModel from "../models/usuario.schema.js";
import ProductModel from "../models/producto.schema.js";
import AnimalModel from "../models/animal.schema.js"; // Asegúrate de tener el modelo para animales
import PlanModel from "../models/plan.schema.js"; // Asegúrate de tener el modelo para planes
import ComentarioModel from "../models/comentarios.schema.js"; // Asegúrate de tener el modelo para comentarios
import { usuarios } from "../mocks/usuarios.mock.js";
import { productos } from "../mocks/productos.mock.js";
import { animales } from "../mocks/animales.mock.js"; // Importar el array de animales
import { planes } from "../mocks/planes.mock.js"; // Importar el array de planes
import { comentarios } from "../mocks/comentarios.mock.js"; // Importar el array de planes
import { hashPassword } from "./register.utils.js";

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
          const hashedPassword = await hashPassword(usuario.contrasenia);

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
      // Inicializar planes
      const planesExistentes = await PlanModel.find();

      if (planesExistentes.length === 0) {
        for (const plan of planes) {
          const nuevoPlan = new PlanModel(plan);
          await nuevoPlan.save();
        }
        console.log("Planes iniciales creados con éxito.");
      } else {
        console.log("La base de datos ya contiene planes.");
      }

      // Obtener planes con sus _id
      const planesCreados = await PlanModel.find();
      const planBasico = planesCreados.find(p => p.nombre === "Básico")._id;
      const planCompleto = planesCreados.find(p => p.nombre === "Completo")._id;
      const planPremium = planesCreados.find(p => p.nombre === "Premium")._id;

      // Inicializar animales
      const animalesExistentes = await AnimalModel.find();

      if (animalesExistentes.length === 0) {
        for (const animal of animales) {
          // Asignar el plan correspondiente según el nombre del plan en el array
          switch (animal.plan) {
            case "Básico":
              animal.plan = planBasico;
              break;
            case "Completo":
              animal.plan = planCompleto;
              break;
            case "Premium":
              animal.plan = planPremium;
              break;
            default:
              animal.plan = null;  // O un plan por defecto
          }

          const resultado = await postAnimalService(animal);
          console.log(resultado.mensaje);
        }
        console.log("Animales iniciales creados con éxito.");
      } else {
        console.log("La base de datos ya contiene animales.");
      }
    } catch (error) {
      console.error("Error al inicializar animales y planes:", error);
    }
  };

  const inicializarComentarios = async () => {
    try {
      const comentariosExistentes = await ComentarioModel.find();

      if (comentariosExistentes.length === 0) {
        for (const comentario of comentarios) {
          const resultado = await postComentarioService(comentario);
          console.log(resultado.mensaje);
        }
        console.log("Comentarios iniciales creados con éxito.");
      } else {
        console.log("La base de datos ya contiene comentarios.");
      }
    } catch (error) {
      console.error("Error al inicializar comentarios:", error);
    }
  };

  inicializarUsuarios();
  inicializarProductos();
  inicializarAnimales();
  inicializarComentarios(); // Llama a la función para inicializar los comentarios
}