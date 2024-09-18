import bcrypt from "bcryptjs";

// Función para encriptar una contraseña
export const encryptPassword = async (password) => {
  try {
    const saltRounds = 10; // Número de rondas de salt
    const hashedPassword = await bcrypt.hash(password, saltRounds); // Hashear la contraseña
    return hashedPassword;
  } catch (error) {
    throw new Error("Error al encriptar la contraseña");
  }
};