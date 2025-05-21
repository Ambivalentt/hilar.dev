import express from 'express';
import database from './src/config/server.js';
import dotenv from 'dotenv';
dotenv.config();
import userRoutes from './src/routes/users.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import projectRoutes from './src/routes/projects.js';

const app = express();



app.use(cors({
    origin:'https://hilar.dev',
    // origin:'http://localhost:5173',
    credentials: true
}));

const PORT = process.env.PORT || 3000;
app.use(cookieParser());
app.use(express.json());
app.use('/user', userRoutes);
app.use('/project', projectRoutes);

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