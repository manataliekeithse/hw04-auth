import jwt from "jsonwebtoken";
import { User } from "../models/usersModel.js";
import "dotenv/config";

const { SECRET_KEY } = process.env;

const authenticateToken = async (req, res, next) => {
  //we are accessing the authorization string  from the request.headers similar to how
  //we are accessing request body
  const { authorization = "" } = req.headers;

  //this retrieves the token string from the bearer token by separating the word bearer
  //and the random string after it.
  const [bearer, token] = authorization.split(" ");

  //Check if the bearer token is provided and valid
  if (bearer !== "Bearer" || !token) {
    console.log("Invalid authorization format or missing token");
    return res.status(401).json({ message: "Not authorized" });
  }
  //Verify the token
  try {
    console.log("Verifying token...");

    const { id } = jwt.verify(token, SECRET_KEY);
    console.log("Token verified, user ID:", id);

    const user = await User.findById(id);
    if (!user || user.token !== token || !user.token) {
      console.log("User not found or token mismatch");
      return res.status(401).json({ message: "Not authorized" });
    }

    req.user = user;
    console.log("User authenticated successfully:", user.email);
    next();
  } catch (err) {
    console.log("Error verifying token:", err.message);

    return res.status(401).json({ message: "Not authorized" });
  }
};

export { authenticateToken };
