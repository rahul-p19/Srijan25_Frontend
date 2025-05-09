//import jwt from 'jsonwebtoken';

const SECRET_KEY = 'your-secret-key';

export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    //const decoded = jwt.verify(token, SECRET_KEY);
    //req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};
