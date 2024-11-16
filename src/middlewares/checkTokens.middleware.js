import { verifyTokens } from "../helpers/index.helper.js";
import { logger } from "../utils/index.utils.js";

export const checkToken = (req, res, next) => {
  try {
    const bearerToken = req.headers.authorization;
    
    if (!bearerToken || !bearerToken.startsWith("Bearer")) {
      return res.status(401).send("Authentication is required in bearer token");
    }
    const token = bearerToken.split(" ")[1];
    const decode = verifyTokens("access", token);

    req.payload = decode;
    next();
  } catch (err) {
    logger.error("Error in token verification:", err);
    res.status(500).json({ error: "Server error while verifying token" });
  }
};
