import bcrypt from "bcryptjs";

// Función para encriptar (hashear) una contraseña
export const hashPassword = async (password) => {
  try {
    const saltRounds = 10; // Número de rondas de salt
    const hashedPassword = await bcrypt.hash(password, saltRounds); // Hashear la contraseña
    return hashedPassword; // Retorna la contraseña hasheada
  } catch (error) {
    throw new Error("Error al hashear la contraseña"); // Manejo de errores
  }
};