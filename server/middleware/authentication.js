const jwt = require('jsonwebtoken');
const authentication = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        if (token) {
            try {
                req.user = jwt.verify(token, process.env.SECRET_KEY);
            } catch (error) {
                return res.status(401).json({status: 401, message: "Invalid Token"});
            }
            return next();

        } else {
            return res.status(400).json({status: 400, message: "Token is required"})
        }


    } catch (error) {
        console.log(error);
        return res.status(500).json({status: 500, message: "Invalid Token "})
    }
}

module.exports = authentication;
