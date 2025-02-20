const bcrypt = require('bcrypt');

const ADMIN_EMAIL = 'Vmandir148@gmail.com';
// Replace with the output of bcrypt.hash()
const HASHED_PASSWORD = '$2b$10$AbT1VAmqMwONqHMd.l2MoeXY0JBwYfddKmTHngWVQClMSQ7hOKSia'; 

async function authenticateAdmin(req, res, next) {
  const { email, password } = req.body; // Assuming credentials are passed in body, not headers

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  if (email !== ADMIN_EMAIL) {
    return res.status(403).json({ error: 'Invalid credentials' });
  }

  const isMatch = await bcrypt.compare(password, HASHED_PASSWORD);
  if (!isMatch) {
    return res.status(403).json({ error: 'Invalid credentials' });
  }

  next(); // Allow access to the protected routes after authentication
}

module.exports = authenticateAdmin;
