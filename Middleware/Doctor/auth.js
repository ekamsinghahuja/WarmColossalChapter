const jwt = require('jsonwebtoken');

const authMiddleware = async (req, res, next) => {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1]; 
    if (!token) {
        return res.status(401).json({ success: false, message: "Not authorized. Please log in again."});
    }
    try {
        const token_decode = jwt.verify(token, "temporary_secret");
        console.log(token_decode);
        /* issue */
        req.body.doctor_id = token_decode._id;
        console.log(req.body);
        next();
    } 
    catch (error) {

        console.log(error);
        return res.status(401).json({ success: false, message: "Error in authentication." });
    }
};

module.exports = authMiddleware;