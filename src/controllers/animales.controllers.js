import {
  getAnimalesService,
  getAnimalService,
  postAnimalService,
  putAnimalService,
  deleteAnimalService,
  agregarFotoAnimalService,
} from '../services/animales.service.js';

export const getAnimalsController = async (req, res) => {
  try {
    const result = await getAnimalesService(req.pagination);  // Con paginación
    return res.status(result.statusCode).json({
      animales: result.animales,
      totalAnimales: result.totalAnimales,
      page: req.pagination ? req.pagination.page : null,
      limit: req.pagination ? req.pagination.limit : null
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
    const result = await deleteAnimalService(idAnimal);
    return res.status(result.statusCode).json({ msg: result.mensaje });
  } catch (error) {
    return res.status(500).json({ msg: "Error interno del servidor." });
  }
};

export const agregarFotoAnimalController = async (req, res) => {
  console.log("ENTRA AL CONTROLADOR")
  try {
    const result = await agregarFotoAnimalService(req.params.idAnimal, req.file);
    return res.status(result.statusCode).json({ msg: result.mensaje });
  } catch (error) {
    return res.status(500).json({ msg: "Error al cargar foto del animal" });
  }
};