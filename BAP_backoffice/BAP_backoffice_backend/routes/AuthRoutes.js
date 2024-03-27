import express from "express";
import { getUsers, getUserById, signUp, logIn, updateUser, deleteUser, verifyRole } from '../controllers/AuthController.js'

const router = express.Router()

router.get('/', getUsers)
router.get('/:id', getUserById)
router.delete('/:id', deleteUser)
router.post('/signup', signUp)
router.post('/login', logIn)
router.patch('/update/:id', updateUser)
router.get('/connection', verifyRole)

export default router