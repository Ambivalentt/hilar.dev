import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const authMiddleware = (req, res, next) => {
    const token  = req.cookies.acces_token;
    if (!token) return res.status(401).json({ error: 'No token provided' });
    try{
        const data = jwt.verify(token, process.env.JWT_SECRET);
        req.user = data;
        next();
    }catch(err){
        res.status(401).json({error:'token expired or invalid'});
    }
}

export default authMiddleware;