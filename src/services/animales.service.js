import AnimalModel from "../models/animal.schema.js";
import cloudinary from "../helpers/cloudinary.config.js";

// Obtener todos los animales con paginación
export const getAnimalesService = async (pagination = null) => {
  let animales;
  let totalAnimales = await AnimalModel.countDocuments(); // Obtener el total de animales

  if (pagination) {
    const { skip, limit } = pagination;
    animales = await AnimalModel.find()
      .skip(skip)
      .limit(limit)
      .populate("dueño", "nombre email");  // Populate opcional
  } else {
    animales = await AnimalModel.find().populate("dueño", "nombre email"); // Si no hay paginación, traer todos los animales
  }

  return {
    animales,
    totalAnimales,
    statusCode: 200,
  };
};

// Obtener un animal por su ID
export const getAnimalService = async (idAnimal) => {
  const animal = await AnimalModel.findById(idAnimal).populate("dueño", "nombre email");
  
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
  await nuevoAnimal.save();

  return {
    mensaje: "Animal creado con éxito!",
    statusCode: 201,
    nuevoAnimal,
  };
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
export const deleteAnimalService = async (idAnimal) => {
  const animal = await AnimalModel.findByIdAndDelete(idAnimal);

  if (!animal) {
    return {
      mensaje: "Animal no encontrado",
      statusCode: 404,
    };
  }

  return {
    mensaje: "Animal eliminado",
    statusCode: 200,
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