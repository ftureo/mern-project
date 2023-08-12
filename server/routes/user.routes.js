import { Router } from "express";

import { getUsers, register, login, logout } from "../controllers/usersController.js";

const router = Router();

router.get("/users", getUsers)
router.post("/register", register)
router.post("/login", login)
router.post("/logout", logout)

export default router