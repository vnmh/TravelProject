const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.get("Authentication");
  if (!authHeader) {
    const error = new Error("Not authenticated.");
    error.statusCode = 401;
    res.status(500).json(error);
    throw error;
  }
  const token = authHeader;

  let decodedToken;

  try {
    decodedToken = jwt.verify(token, process.env.SECURITY);
  } catch (err) {
    err.statusCode = 500;
    res.status(500).json(err);
    throw err;
  }

  if (!decodedToken) {
    const error = new Error("Not authenticated.");
    error.statusCode = 401;
    res.status(500).json(error);
    throw error;
  }

  req.idAccount = decodedToken.idAccount;
  req.email = decodedToken.email;
  req.role = decodedToken.role;

  next();
};