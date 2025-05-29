import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import database from './src/config/server.js';
import userRoutes from './src/routes/users.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import projectRoutes from './src/routes/projects.js';
import tasksRoute from './src/routes/tasks.js';
import comment from './src/routes/comments.js';
import recentActivity from './src/routes/activity.js';
const app = express();

app.use(cors({
    origin:'https://hilar.dev',
    credentials: true
}));

const PORT = process.env.PORT || 3000;
app.use(cookieParser());
app.use(express.json());
app.use('/user', userRoutes);
app.use('/project', projectRoutes);
app.use('/tasks', tasksRoute);
app.use('/comments', comment);
app.use('/activity', recentActivity);
app.use((req, res) => {
    res.status(404).json({ message: 'Route not found'});
});

database.query('SELECT 1 + 1 AS solution', (error, results) => {
    if (error) {
        console.error('Database connection error:', error);
        return;
    }
     console.log(`Database SQL is connected ${results}`);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

