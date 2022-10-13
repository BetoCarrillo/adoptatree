import bcrypt from "bcrypt";

const encryptPassword = async (password) => {
  console.log("password", password);
  console.log("type password", typeof password);
  try {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashPassword = await bcrypt.hash(password, salt);
    return hashPassword;
  } catch (error) {
    console.log("error hashing password", error);
  }
};

const verifyPassword = async (password, hashedPassword) => {
  const verified = bcrypt.compare(password, hashedPassword);
  console.log("verified", verified);
  return verified;
};

export { encryptPassword, verifyPassword };
