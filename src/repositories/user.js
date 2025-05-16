import db from '../config/server.js';
import bcrypt from 'bcryptjs';

class UserRepository {
    async create({first_name, last_name, email, password, rol, avatar}) {

        const hashedPw = await bcrypt.hash(password, 10);
        const query = 'INSERT INTO users (first_name, last_name, email, password, rol, image_url) VALUES (?, ?, ?, ?, ?, ?)';
        const [results] = await db.promise.query(query, [first_name, last_name, email, hashedPw, rol, avatar]);
       return results;
    }
}


export default UserRepository;