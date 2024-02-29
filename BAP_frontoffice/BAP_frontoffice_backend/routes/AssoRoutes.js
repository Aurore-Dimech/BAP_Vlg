import express from "express";
import { getAssos, getAsso, searchAsso } from "../controllers/AssoController.js" 

const router = express.Router() 

router.get('/', getAssos)
router.get('/:id', getAsso)
router.get('/search/:searchInput', searchAsso)

export default router