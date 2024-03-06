import express from "express";
import { getAssos, getAsso, createAsso, updateAsso, deleteAsso, searchAsso, getEventsByAsso } from "../controllers/AssoController.js" 

const router = express.Router() 

router.get('/', getAssos)
router.get('/:id', getAsso)
router.get('/events/:id', getEventsByAsso)
router.post('/', createAsso)
router.patch('/:id', updateAsso)
router.delete('/:id', deleteAsso)
router.get('/search/:searchInput', searchAsso)

export default router