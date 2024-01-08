const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');

async function login(request, response) {
    try {
        const { 
            email,
            password
        } = request.body;

        if(!email || !password) {
            return response.status(400).json({ message: 'Missing fields' });
        }

        const user = await User.findByEmail(email);
        if (!user) {
            return response.status(400).json({ message: 'User not found' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return response.status(400).json({ message: 'Invalid password' });
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: '1d',
        });
    
        return response
        .status(201)
        .json({
            message: 'User created successfully', 
            data: {
                token,
                user: user.json(),
            }
        });
    } catch (error) {
        console.log(error);
        return response.status(500).json({ message: 'Internal server error', error: error.message });    }

}

router.post('/', login);

module.exports = router;