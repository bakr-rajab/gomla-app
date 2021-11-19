const jwt=require('jsonwebtoken');

module.exports = function (req, res, next) {
    const token = req.header('auth-token');

    !token && res.status(401).json('Access Denied');

    try {
        const verified = jwt.verify(token, process.env.SECRET)
        req.user=verified;
        next()
    } catch (error) {
        next(error);
    }
}