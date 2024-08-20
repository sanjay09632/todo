const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
    const token = req.headers['x-access-token'];
    if (!token) return res.status(403).send({ auth: false, message: 'No token provided.' });

    jwt.verify(token, 'secretkey', (err, decoded) => {
        if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

        req.user = decoded;
        next();
    });
};

exports.isAdmin = (req, res, next) => {
    if (req.user.role !== 'Admin') {
        return res.status(403).send({ message: 'Require Admin Role!' });
    }
    next();
};

exports.isManagerOrAdmin = (req, res, next) => {
    if (req.user.role !== 'Manager' && req.user.role !== 'Admin') {
        return res.status(403).send({ message: 'Require Manager or Admin Role!' });
    }
    next();
};
