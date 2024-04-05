const User = require("../models/User");
const jwt = require('jsonwebtoken');


async function authMiddleware(request, response, next) {
    const authHeader = request.headers.authorization;
    if (!authHeader) {
        return response.status(401).json({ message: 'Missing authorization header' });
    }

    const [scheme, token] = authHeader.split(' ');
    if (!scheme || !token) {
        return response.status(401).json({ message: 'Missing authorization header' });
    }

    if (scheme !== 'Bearer') {
        return response.status(401).json({ message: 'Invalid authorization header' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const { id } = decoded;
        const user = await User
            .findById(id)
            .catch((err) => { throw err })
        if (!user) {
            return response.status(401).json({ message: 'Invalid token' });
        }

        request.user = user;
        next();
    } catch (error) {
        console.log(error);
        return response.status(500).json({ message: 'Internal server error', error: error.message });
    }
}

module.exports = authMiddleware;