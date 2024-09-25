import {
  getAnimalesService,
  getAnimalService,
  postAnimalService,
  putAnimalService,
  deleteAnimalService,
  agregarFotoAnimalService,
  createAnimalService
} from '../services/animales.service.js';

export const getAnimalsController = async (req, res) => {
  try {
    const filters = req.filters || {}; // Obtener los filtros dinámicos
    const result = await getAnimalesService(req.pagination, filters); // Pasar los filtros al servicio

    return res.status(result.statusCode).json({
      animales: result.animales,
      totalAnimales: result.totalAnimales,
      page: req.pagination ? req.pagination.page : null,
      limit: req.pagination ? req.pagination.limit : null,
    });
  } catch (error) {
    return res.status(500).json({ msg: "Error interno del servidor." });
  }
};

export const getAnimalController = async (req, res) => {
  try {
    const idAnimal = req.params.idAnimal;
    const result = await getAnimalService(idAnimal);
    return res.status(result.statusCode).json(result.animal || { msg: result.mensaje });
  } catch (error) {
    return res.status(500).json({ msg: "Error interno del servidor." });
  }
};

export const postAnimalController = async (req, res) => {
  try {
    const nuevoAnimalData = req.body;
    const result = await postAnimalService(nuevoAnimalData);
    return res.status(result.statusCode).json({ msg: result.mensaje, nuevoAnimal: result.nuevoAnimal });
  } catch (error) {
    return res.status(500).json({ msg: "Error interno del servidor." });
  }
};

export const putAnimalController = async (req, res) => {
  try {
    const idAnimal = req.params.idAnimal;
    const animalData = req.body;
    const result = await putAnimalService(idAnimal, animalData);
    return res.status(result.statusCode).json({ msg: result.mensaje, animal: result.animal });
  } catch (error) {
    return res.status(500).json({ msg: "Error interno del servidor." });
  }
};

export const deleteAnimalController = async (req, res) => {
  try {
    const idAnimal = req.params.idAnimal;
    const result = await deleteAnimalService(idAnimal, req.user);
    return res.status(result.statusCode).json({ msg: result.mensaje });
  } catch (error) {
    return res.status(500).json({ msg: "Error interno del servidor." });
  }
};

export const agregarFotoAnimalController = async (req, res) => {
  try {
    const result = await agregarFotoAnimalService(req.params.idAnimal, req.file);
    return res.status(result.statusCode).json({ msg: result.mensaje });
  } catch (error) {
    return res.status(500).json({ msg: "Error al cargar foto del animal" });
  }
};

export const createAnimalController = async (req, res) => {
  try {
    // Verifica si hay un campo fotoUrl y si está vacío, lo elimina
    if (req.body.fotoUrl === '') {
      delete req.body.fotoUrl;
    }

    // Convierte las vacunas en un array de objetos con nombre y fecha
    const vacunas = req.body.vacunas
      ? req.body.vacunas.map((vacuna) => ({ nombre: vacuna, fecha: Date.now() }))
      : [];

    const animalData = {
      ...req.body,
      duenio: req.user._id, // Establece el ID del usuario actual como dueño
      estado: "Mascota", // Establece el estado como "Mascota"
      creadoPor: req.user._id,
      actualizadoEn: Date.now(), // Invoca la función para obtener la fecha actual
      vacunas, // Asigna el array de vacunas formateado
    };

    const newAnimal = await createAnimalService(animalData, req.user._id);
    res.status(201).json({ message: 'Animal creado exitosamente', animal: newAnimal });
  } catch (error) {
    console.error('Error creando animal:', error);
    res.status(500).json({ message: 'Error al crear el animal' });
  }
};