import express from 'express';
import mongoose from 'mongoose';
import issueRoutes from './routes/issueRoute';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mongoose.connect('mongodb://127.0.0.1:27017/sitemate_test')
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => console.log(`MongoDB connection Error: ${err}`));

app.use('/api/issues', issueRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
