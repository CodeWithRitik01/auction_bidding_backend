import express from "express"
import { isAuthenticated } from "../middlewares/auth.js"
import { createUser, getAllUsers, login, logout, updateUserToAdmin } from "../controllers/user.controllers.js";

const app = express.Router();

app.post('/signup', createUser)
app.post('/login', login)

app.use(isAuthenticated)

app.get('/', getAllUsers)
app.get('/logout', logout)
app.put('/makeadmin', updateUserToAdmin)

export default app;