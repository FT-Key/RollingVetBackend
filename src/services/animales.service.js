import AnimalModel from "../models/animal.schema.js";
import UserModel from "../models/usuario.schema.js";
import cloudinary from "../helpers/cloudinary.config.js";
import mongoose from 'mongoose';

export const getAnimalesService = async (pagination = null, filters = {}) => {

  // Verificar si el filtro 'duenio' existe y es un ObjectId válido
  if (filters && filters.duenio) {
    if (mongoose.Types.ObjectId.isValid(filters.duenio)) {
      // Convertir a ObjectId
      const duenioObjectId = new mongoose.Types.ObjectId(filters.duenio);
      filters.duenio = duenioObjectId;
    } else {
      console.error("ID dueño no válido:", filters.duenio);
      return {
        animales: [],
        totalAnimales: 0,
        statusCode: 400,
        message: "ID de dueño no válido",
      };
    }
  }

  let animales;
  let totalAnimales = await AnimalModel.countDocuments(filters); // Contar solo los documentos que coincidan con los filtros

  if (pagination) {
    const { skip, limit } = pagination;
    animales = await AnimalModel.find(filters)
      .skip(skip)
      .limit(limit)
      .populate("duenio", "nombre email")  // Populate del duenio
      .populate("plan", "nombre descripcion precio");  // Populate del plan
  } else {
    animales = await AnimalModel.find(filters)
      .populate("duenio", "nombre email")
      .populate("plan", "nombre descripcion precio");  // Populate del plan
  }

  return {
    animales,
    totalAnimales,
    statusCode: 200,
  };
};

// Obtener un animal por su ID
export const getAnimalService = async (idAnimal) => {
  const animal = await AnimalModel.findById(idAnimal)
    .populate("duenio", "nombre email")
    .populate("plan", "nombre descripcion precio");  // Populate del plan

  if (animal) {
    return {
      animal,
      statusCode: 200,
    };
  } else {
    return {
      mensaje: "Animal no encontrado",
      statusCode: 404,
    };
  }
};

// Crear un nuevo animal
export const postAnimalService = async (nuevoAnimalData) => {
  const nuevoAnimal = new AnimalModel(nuevoAnimalData);

  try {
    await nuevoAnimal.save();
    console.log("Punto de control 4");
    return {
      mensaje: "Animal creado con éxito!",
      statusCode: 201,
      nuevoAnimal,
    };
  } catch (error) {
    console.error("Error al crear el animal:", error.message);
    return {
      mensaje: "Error al crear el animal",
      statusCode: 500,
      error: error.message,
    };
  }
};

// Actualizar un animal existente
export const putAnimalService = async (idAnimal, animalData) => {
  const animal = await AnimalModel.findById(idAnimal);

  if (!animal) {
    return {
      mensaje: "Animal no encontrado",
      statusCode: 404,
    };
  }

  // Actualizar la información del animal
  Object.assign(animal, animalData);
  animal.actualizadoEn = new Date();

  const animalActualizado = await animal.save();

  return {
    mensaje: "Animal actualizado",
    animal: animalActualizado,
    statusCode: 200,
  };
};

// Eliminar un animal
export const deleteAnimalService = async (idAnimal, user) => {
  // Buscar el animal
  const animal = await AnimalModel.findById(idAnimal);

  if (!animal) {
    return {
      mensaje: "Animal no encontrado",
      statusCode: 404,
    };
  }

  // Verificar si el usuario es admin o si es el dueño del animal
  if (user.rol === 'admin' || animal.duenio.toString() === user._id.toString()) {
    // Eliminar el animal
    await AnimalModel.findByIdAndDelete(idAnimal);

    // Buscar a los usuarios que tienen este animal en su array de mascotas
    const usuarios = await UserModel.find({ mascotas: idAnimal });

    // Actualizar cada usuario para eliminar el animal de su lista de mascotas
    for (const usuario of usuarios) {
      usuario.mascotas = usuario.mascotas.filter(mascotaId => mascotaId.toString() !== idAnimal);
      await usuario.save();
    }

    return {
      mensaje: "Animal eliminado y referencias actualizadas",
      statusCode: 200,
    };
  }

  // Si no es admin y no es dueño, retorna un mensaje de error
  return {
    mensaje: "No tienes permiso para eliminar este animal",
    statusCode: 403,
  };
};

// Agregar foto del animal
export const agregarFotoAnimalService = async (idAnimal, file) => {
  const animal = await AnimalModel.findById(idAnimal);
  if (!animal) {
    return {
      mensaje: "Animal no encontrado",
      statusCode: 404,
    };
  }

  // Subir la imagen a Cloudinary
  const imagen = await cloudinary.uploader.upload(file.path);
  animal.fotoUrl = imagen.secure_url;

  await animal.save();

  return {
    mensaje: "Foto de animal cargada",
    statusCode: 200,
  };
};

export const createAnimalService = async (animalData, userId) => {
  try {
    const newAnimal = new AnimalModel(animalData);
    await newAnimal.save();

    // Asignar la mascota al usuario
    const usuario = await UserModel.findById(userId);
    if (!usuario) {
      throw new Error('Usuario no encontrado');
    }

    // Agregar el ID de la nueva mascota al array de mascotas del usuario
    usuario.mascotas.push(newAnimal._id);
    await usuario.save();

    return newAnimal;
  } catch (error) {
    throw new Error('Error al crear el animal: ' + error.message);
  }
};