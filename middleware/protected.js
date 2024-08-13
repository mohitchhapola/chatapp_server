const jwt = require('jsonwebtoken');
const User = require('../models/user');

const ProtectRoute = async (req, res, next) => {
    try {
        // Retrieve the JWT token from cookies
        const token = req.cookies.userToken;
        if (!token) {
            return res.status(404).json({ message: "Unauthorized || Token not Found" });
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.status(404).json({ message: "Invalid Token" });
        }

        // Find the user by ID from the token
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(404).json({ message: "User Not Found" });
        }

        // Attach the user to the req object
        req.user = user;

        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        console.log("Error in authorizing:", error.message);
        res.status(400).json({ error: error.message });
    }
};

module.exports = ProtectRoute ;
