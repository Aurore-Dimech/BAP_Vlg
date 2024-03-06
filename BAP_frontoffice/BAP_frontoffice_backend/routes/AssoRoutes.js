import express from "express";
import { getAssos, getAsso, searchAsso, getEventsByAsso } from "../controllers/AssoController.js" 

const router = express.Router() 

router.get('/', getAssos)
router.get('/:id', getAsso)
router.get('/events/:id', getEventsByAsso)
router.get('/search/:searchInput', searchAsso)

export default router