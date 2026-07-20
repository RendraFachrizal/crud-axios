const express = require("express")
const { login, register } = require("../controllers/userController")
const authJWT = require("../middleware/auth")
const userRouter = express.Router()

// userRouter.get('/login', login, authJWT)
userRouter.post('/login', login, authJWT)
userRouter.get('/register', register)
userRouter.post('/register', register)
module.exports = userRouter