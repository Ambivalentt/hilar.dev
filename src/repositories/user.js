import db from '../config/server.js';
import bcrypt from 'bcryptjs';
import DataValidator from './dataValidator.js';
class UserRepository {
    static async create({ first_name, last_name, email, password, image_url }) {
        try {
            DataValidator.str(first_name, first_name);
            DataValidator.str(last_name, last_name);
            DataValidator.email(email);
            DataValidator.password(password);
            const validateEmailQuery = 'SELECT email FROM users WHERE email = ?';
            const [emailResults] = await db.promise().query(validateEmailQuery, [email]);

              if (emailResults.length > 0) {
                throw new Error('Email already exists');
            }
            
            const hashedPw = await bcrypt.hash(password, 10);
            const query = 'INSERT INTO users (first_name, last_name, email, password, role, image_url) VALUES (?, ?, ?, ?, ?, ?)';
            const [results] = await db.promise().query(query, [first_name, last_name, email, hashedPw, 'member', image_url]);

            return results;
        } catch (error) {
            throw error
        }
    }
    static async login({ email, password }) {
        try {
            DataValidator.email(email);
            DataValidator.password(password);
            const query = 'SELECT * FROM users WHERE email = ?';
            const [results] = await db.promise().query(query, [email]);

            if (results.length === 0) {
                throw new Error('Email not found');
            }

            const isMatch = await bcrypt.compare(password, results[0].password);

            if (!isMatch) {
                throw new Error('Invalid password');
            }

            const userId = {
                id: results[0].id,

            }
            return userId;
        } catch (error) {
            throw error
        }
    }

    static async getUserById(id) {
        try {
            DataValidator.number(id, 'id');
            const query = 'SELECT * FROM users WHERE id = ?';
            const [results] = await db.promise().query(query, [id]);

            if (results.length === 0) {
                throw new Error('User not found');
            }
            const userDetails = {
                id: results[0].id,
                first_name: results[0].first_name,
                last_name: results[0].last_name,
                created_at: results[0].created_at,
                email: results[0].email,
                role: results[0].role,
                image_url: results[0].image_url
            }
            return userDetails;
        } catch (error) {
            throw error
        }
    }

    static async getAllRecentUsers() {
        try {
            const query = 'SELECT id, first_name, last_name, image_url FROM users ORDER BY created_at DESC LIMIT 5';
            const [results] = await db.promise().query(query);

            if (results.length === 0) {
                throw new Error('No users found');
            }
          
            return results;
        } catch (error) {
            throw error
        }
    }
}


export default UserRepository;