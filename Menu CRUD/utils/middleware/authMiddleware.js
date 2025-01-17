const jwt = require("jsonwebtoken");
const store = require("../../Model/store");

// Middleware to check if the token is valid and the store exists
const authenticateStore = async (req, res, next) => {
  try {
    // Get the token from the headers
    const token = req.header("token");
    if (!token) {
      return res.status(401).json({ error: "No token provided" });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // Extract the store ID from the decoded token
    const storeId = decoded.id;

    // Check if the store exists in the database
    const storeExists = await store.findById(storeId);
    if (!storeExists) {
      return res.status(404).json({ error: "Store not found" });
    }

    // Attach the store ID to the request object for later use in the route
    req.storeId = storeId;
    next(); // Pass control to the next middleware/route handler
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ message: error.message });
  }
};

module.exports = authenticateStore;
