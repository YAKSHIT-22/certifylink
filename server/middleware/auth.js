const jwt = require('jsonwebtoken');

const verifyAuth = async (req, res, next) => {
    try {
        const token = req.cookies['x-auth-token'];
        if (!token) {
            return res.status(401).json({
                message: 'No token, authorization denied'
            });
        }
        const verify = jwt.verify(token, process.env.JWT_SECRET);
        if (!verify) {
            return res.status(401).json({
                message: 'Token verification failed, authorization denied'
            });
        }

        req.user = verify.id;
        req.email = verify.email
        req.token = token;
        next();
    } catch (err) {
        res.status(400).json({ message: "Token is not valid", err });
    }
}

module.exports = {
    verifyAuth
};