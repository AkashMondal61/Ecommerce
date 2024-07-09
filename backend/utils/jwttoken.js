const user = require("../models/usermodel");

const sendToken = (user, statusCode, res) => {
    const token = user.getToken();

    // Options for cookie
    const options = {
        expire: new Date(
            Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        ),
        httpOnly: true
    };

    res.status(statusCode).cookie("token", token, options).json({
        success: true,
        user,
        token,
    });
};

const sendTokengooglesignin = (user, statusCode, res) => {
    const token = user.getToken();

    // Options for cookie
    const options = {
        expire: new Date(
            Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        ),
        httpOnly: true
    };

    res.cookie("token", token, options);
};

// Export both functions
module.exports = {
    sendToken,
    sendTokengooglesignin
};
