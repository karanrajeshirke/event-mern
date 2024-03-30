import JWT from 'jsonwebtoken';

export const requireSignIn = async (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ error: 'Authorization token is missing' });
    }
  
    try {
      const decode = JWT.verify(token, "nosecret");
      req.user = decode;
      next();
    } catch (err) {
      console.log(err);
      return res.status(401).json({ error: 'Invalid token Babu' });
    }
  };