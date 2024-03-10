import { Schema, model, Document } from 'mongoose';

export interface IssueType extends Document {
  title: string;
  description: string;
}

const IssueSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  }
});

export default model<IssueType>('Issue', IssueSchema);
