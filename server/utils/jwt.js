import jsonwebtoken from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();

const issueToken = (userId) => {
  // const issueToken = (email) => { // to generate token during signup, using email
  const options = {
    expiresIn: "7d",
  };
  const payload = {
    sub: userId,
    // sub: email,
  };

  const jwt = jsonwebtoken.sign(payload, process.env.SECRET_OR_KEY, options);
  return jwt;
};

export { issueToken };
