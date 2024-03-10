import mongoose from 'mongoose';
import Issue from '../models/Issue';

describe('Issue Model', () => {
  beforeAll(async () => {
    await mongoose.connect('mongodb://127.0.0.1:27017/test');
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  afterEach(async () => {
    await Issue.deleteMany({});
  });

  it('should create and save a new issue', async () => {
    const issueData: any = {
      title: 'Test Title',
      description: 'Test Description'
    };
    const newIssue = new Issue(issueData);

    const savedIssue = await newIssue.save();

    expect(savedIssue.title).toBe(issueData.title);
    expect(savedIssue.description).toBe(issueData.description);
  });

  it('should not save an issue without a title', async () => {
    const issueData: any = {
      description: 'Test Description'
    };
    const issue = new Issue(issueData);

    await expect(issue.save()).rejects.toThrow();
  });

  it('should not save an issue without a description', async () => {
    const issueData: any = {
      title: 'Test Title'
    };
    const issue = new Issue(issueData);

    await expect(issue.save()).rejects.toThrow();
  });
});
