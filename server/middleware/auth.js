const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  const authHeader = req.header('Authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  const token = authHeader.replace('Bearer ', '');

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // USE ENV
    req.user = decoded; // { id: user._id }
    next();
  } catch (err) {
    console.error("Token invalid:", err.message);
    res.status(401).json({ msg: 'Token is not valid' });
  }
};