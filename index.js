import express from 'express';
import database from './src/config/server.js';
import dotenv from 'dotenv';
dotenv.config();
import router from './src/routes/users.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());


app.use('/users', router);









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