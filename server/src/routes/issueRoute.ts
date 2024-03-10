import express from 'express';
import { createIssue, getIssue, updateIssue, deleteIssue } from '../controllers/issueController';

const router = express.Router();

router.post('/', createIssue);
router.get('/:id', getIssue);
router.put('/:id', updateIssue);
router.delete('/:id', deleteIssue);

export default router;
