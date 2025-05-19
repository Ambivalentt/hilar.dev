import User from '../repositories/user.js';
import uploadToCloudinary from '../utils/upCloudinary.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const createUser = async (req, res) => {
    try {
        const { first_name, last_name, email, password } = req.body;
        let image_url = null;

        if (req.file && req.file.buffer) {
            image_url = await uploadToCloudinary(req.file.buffer);
        }
        const result = await User.create({ first_name, last_name, email, password, image_url });

        res.status(201).json({ message: 'User created successfully', user: result });
    } catch (error) {
        console.error('Error in createUser:', error);
        res.status(400).json({ message: error.message });
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await User.login({ email, password });
        const refreshToken = jwt.sign({ id: result.id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.cookie('refresh_token', refreshToken, {
            httpOnly: true,
            // secure: true, //cambiar true en producction
            // sameSite: "none", //si el front y el back son de diferentes dominios
            // maxAge: 7 * 24 * 60 * 60 * 1000, //7 dias
            // path: '/'
        })
        res.status(200).json({ message: 'Login successful', user: result });
    } catch (error) {
        console.error('Error in loginUser:', error);
        res.status(400).json({ message: error.message });
    }
}

const refreshToken = async (req, res) => {
    const refreshToken = req.cookies.refresh_token;
    if (!refreshToken) return res.status(401).json({ error: 'No token provided' });
    try {
        const data = jwt.verify(refreshToken, process.env.JWT_SECRET);
        const user = await User.getUserById(data.id);
        const newToken = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.cookie('access_token', newToken, {
            httpOnly: true,
            // secure: true, //cambiar true en producction
            // sameSite: "none", //si el front y el back son de diferentes dominios
            // path: '/'
        })
        res.status(200).json({ token: newToken });
    } catch (err) {
        res.status(401).json({ error: 'token expired or invalid' });
    }
}

const userDetails = async (req, res) => {
    try {
        const user = req.user;
        if (!user) return res.status(401).json({ error: 'unauthorized from userDetails' });
        res.status(200).json(user);
    } catch (err) {
        res.status(401).json({ error: `token expired or invalid : ${err.message}`, });
    }
}

const clearCookies = (req, res) => {
    res.clearCookie('access_token', {
        httpOnly: true,
        // secure: true,
        // sameSite: 'None',
        // path: '/', // importante si las cookies fueron seteadas en una ruta específica
    });

    res.clearCookie('refresh_token', {
        httpOnly: true,
        // secure: true,
        // sameSite: 'None',
        // path: '/',
    });
    res.status(200).json({ message: 'Logout successful' });
}       

export { createUser, loginUser, refreshToken, userDetails, clearCookies };