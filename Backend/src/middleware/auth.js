const jwt = require("jsonwebtoken");
const { authPlugins } = require("mysql2");
require("dotenv").config();

const authJWT = (req, res, next) => {
  const authHeader = req.header("Authorization");
  if (!authHeader) {
    res.setHeader("www-Authenticate", "bearer");
    return res.status(401).json({
      status: "Akses Ditolak",
      message: "Log in terlebih dahulu",
    });
  }

  const token = authHeader.split(" ")[1];
  //   console.log(token);
  if (!token) {
    return res.status(401).json({
      status: "Akses Ditolak",
      message: "Format token yang dimasukan salah 'Bearer <token>'",
    });
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(401).json({
        status: "Ditolak",
        message: "Invalid token",
      });
    } else {
      req.user = user;
      console.log(user);
      next();
    }
  });
};

module.exports = authJWT;
