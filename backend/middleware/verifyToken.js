const jwt = require("jsonwebtoken");
const JWT_SECRET = "mukieTheBuilder";

const verifyToken = (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader) {
    return res.status(401).json({ status: false, error: "Please authenticate using a valid token" });
  }


  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ status: false, error: "Please authenticate using a valid token" });
  }
  console.log(`Verifying token: ${token}`);
  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user;
    console.log(`Token verified for user id: ${data.user.id}`);
    next();
  } catch (error) {
    return res.status(401).json({ status: false, error: "Please authenticate using a valid token" });
  }
};

module.exports = verifyToken;
