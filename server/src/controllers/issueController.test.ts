import { Request, Response } from 'express';
import {
  createIssue,
  getIssue,
  updateIssue,
  deleteIssue
} from '../controllers/issueController';
import Issue from '../models/Issue';

jest.mock('../models/Issue'); // Mock the Issue model

describe('Issue Controller', () => {
    let req: Partial<Request>;
    let res: Partial<Response>;

    beforeEach(() => {
        req = {};
        res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis()
        };
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('createIssue', () => {
        it('should create a new issue', async () => {
            req.body = { title: 'Test Title', description: 'Test Description' };
            const newIssue = new Issue(req.body);
            Issue.prototype.save = jest.fn().mockResolvedValueOnce(newIssue);

            await createIssue(req as Request, res as Response);

            expect(res.status).not.toHaveBeenCalled();
        });

        it('should handle errors', async () => {
            req.body = { title: 'Test Title', description: 'Test Description' };
            const errorMessage = 'Internal Server Error';
            Issue.prototype.save = jest.fn().mockRejectedValueOnce(new Error(errorMessage));

            await createIssue(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
        });
    });

    describe('getIssue',  () => {
        it('should return the issue if found', async () => {
            req.params = { id: '123' };
            const issueData = { _id: '123', title: 'Test Title', description: 'Test Description' };
            Issue.findById = jest.fn().mockResolvedValueOnce(issueData);

            await getIssue(req as Request, res as Response);

            expect(res.json).toHaveBeenCalledWith(issueData);
        });

        it('should return 404 if issue is not found', async () => {
            req.params = { id: '123' };
            Issue.findById = jest.fn().mockResolvedValueOnce(null);

            await getIssue(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ error: 'Issue not found' });
        });

        it('should handle errors', async () => {
            req.params = { id: '123' };
            const errorMessage = 'Internal Server Error';
            Issue.findById = jest.fn().mockRejectedValueOnce(new Error(errorMessage));

            await getIssue(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
        });
    });

    describe('updateIssue', () => {
        it('should update the issue', async () => {
            req = {
                params: { id: '123' },
                body: { title: 'Updated Title', description: 'Updated Description' }
            };

            const updatedIssueData = { _id: '123', title: 'Updated Title', description: 'Updated Description' };
            Issue.findByIdAndUpdate = jest.fn().mockResolvedValueOnce(updatedIssueData);
        
            await updateIssue(req as Request, res as Response);
        
            expect(res.json).toHaveBeenCalledWith(updatedIssueData);
        });
            
        it('should handle errors', async () => {
            req = {
                params: { id: '123' },
                body: { title: 'Updated Title', description: 'Updated Description' }
            };

            const errorMessage = 'Internal Server Error';
            Issue.findByIdAndUpdate = jest.fn().mockRejectedValueOnce(new Error(errorMessage));
        
            await updateIssue(req as Request, res as Response);
        
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
        });
    });

    describe('deleteIssue', () => {
        it('should delete the issue', async () => {
            req = { params: { id: '123' } };

            const deletedIssueMessage = { message: 'Issue deleted successfully' };
            Issue.findByIdAndDelete = jest.fn().mockResolvedValueOnce(null);
        
            await deleteIssue(req as Request, res as Response);
        
            expect(res.json).toHaveBeenCalledWith(deletedIssueMessage);
        });
        
        it('should handle errors', async () => {
            req = { params: { id: '123' } };

            const errorMessage = 'Internal Server Error';
            Issue.findByIdAndDelete = jest.fn().mockRejectedValueOnce(new Error(errorMessage));
        
            await deleteIssue(req as Request, res as Response);
        
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
        });
    });
});
