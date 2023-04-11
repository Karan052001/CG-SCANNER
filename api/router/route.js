import express, { Router } from 'express';
import { getScans, addScan, getScanById, editScan, deleteScan } from '../controller/user-controller.js';


const router = express.Router();


router.get('/', getScans);
router.post('/add', addScan);
router.get('/:id', getScanById);
router.put('/:id', editScan);
router.delete('/:id', deleteScan);

export default router;