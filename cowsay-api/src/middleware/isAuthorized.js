import jwt from "jsonwebtoken";
import { setStatusCode } from "../utils/helpers";

export const isAuthorized = (req, res, next) => {
  try {
    const authHeader = req.get("Authorization");
    if (!authHeader) {
      req.isAuthorized = false;
      return next();
    }

    console.log("AUTH Header", authHeader);
    const token = authHeader.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    if (!decodedToken) {
      req.isAuthorized = false;
      console.log("BAD TOKEN");
      return next();
    }

    req.userId = decodedToken._id;
    req.isAuthorized = true;
    console.log("GOOD TOKEN");
    next();
  } catch (error) {
    next(setStatusCode(error));
  }
};
