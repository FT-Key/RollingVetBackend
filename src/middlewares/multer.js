import multer from "multer";

// Filtro para aceptar solo imágenes
const imageFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true); // Aceptar el archivo
  } else {
    cb(new Error("Solo se permiten imágenes"), false); // Rechazar el archivo
  }
};

const upload = multer({
  storage: multer.diskStorage({}),
  fileFilter: imageFilter
});

export default upload;