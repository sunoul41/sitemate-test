import { Request, Response } from 'express';
import Issue from '../models/Issue';

export const createIssue = async (req: Request, res: Response) => {
  try {
    const { title, description } = req.body;
    const issue = new Issue({ title, description });
    await issue.save();
    res.json(issue);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getIssue = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const issue = await Issue.findById(id);

    if (!issue) {
      res.status(404).json({ error: 'Issue not found' });
    }
    res.json(issue);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateIssue = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    const issue = await Issue.findByIdAndUpdate(id, { title, description }, { new: true });
    res.json(issue);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteIssue = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await Issue.findByIdAndDelete(id);
    res.json({ message: 'Issue deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
