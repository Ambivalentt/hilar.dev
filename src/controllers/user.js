import User from '../repositories/user.js';


const createUser = async (req, res) => {
    try{
        const { first_name, last_name, email, password, rol, avatar } = req.body;
        const result = await User.create({ first_name, last_name, email, password, rol, avatar });
        res.status(201).json({ message: 'User created successfully', user: result });
    }catch (error) {
        res.status(500).json({ message: error.message });
    }
}


export default createUser;