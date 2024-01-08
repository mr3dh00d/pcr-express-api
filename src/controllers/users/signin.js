const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');

async function signin(request, response) {
    try {
        
        const { 
            name,
            username,
            avatar,
            email,
            password,
            repeat_password,
        } = request.body;
    
        if(!name || !username || !email || !password || !repeat_password) {
            return response.status(400).json({ message: 'Missing fields' });
        }
    
        if(password !== repeat_password) {
            return response.status(400).json({ message: 'Passwords do not match' });
        }
    
        const user = await User.findByEmail(email);
        if (user) {
            return response.status(400).json({ message: 'User already exists' });
        }
        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
    
        const newUser = new User({
            name,
            username,
            avatar,
            email,
            password: hashedPassword,
        });
    
        newUser.save();
    
        const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, {
            expiresIn: '1d',
        });
    
        return response
        .status(201)
        .json({
            message: 'User created successfully', 
            data: {
                token,
                user: newUser.json(),
            }
        });
    } catch (error) {
        console.log(error);
        return response.status(500).json({ message: 'Internal server error', error: error.message });    }

}

router.post('/', signin);

module.exports = router;