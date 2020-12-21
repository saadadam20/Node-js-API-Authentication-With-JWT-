const jwt = require('jsonwebtoken');

// privite token 
module.exports  = function (req, res, next) {
    const token = req.header('auth-token');
    if (!token) return res.status(401).send('access denied');

    try {
        const verified = jwt.verify(token, process.env.secryed);
        req.user = verified;
        
        next();
    } catch (error) {
        res.status(401).send('invalid token');
    }

}
