import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      if (!process.env.JWT_SECRET) {
        console.error("❌ CRITICAL: JWT_SECRET is not set in environment variables!");
        return res.status(500).json({ message: "Server configuration error" });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select("-password");

      if (!req.user) {
        console.error("❌ User not found for ID:", decoded.id);
        return res.status(401).json({ message: "User not found" });
      }

      next();
    } catch (error) {
      console.error("❌ JWT verification error:", error.message);
      console.error("Error details:", error);
      return res.status(401).json({ message: "Not authorized", error: error.message });
    }
  } else {
    console.error("❌ No authorization header provided");
    return res.status(401).json({ message: "No token provided" });
  }
};

export default protect;
