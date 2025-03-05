// Authentication middleware
const config = require('../config');

// Basic authentication middleware for admin routes
const basicAuth = (req, res, next) => {
  // Get auth header
  const authHeader = req.headers.authorization;
  
  if (!authHeader) {
    res.setHeader('WWW-Authenticate', 'Basic realm="Admin Access"');
    return res.status(401).send('Authentication required');
  }
  
  // Verify auth credentials
  const auth = Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');
  const user = auth[0];
  const pass = auth[1];
  
  if (user === config.auth.adminUsername && pass === config.auth.adminPassword) {
    // Authentication successful
    next();
  } else {
    // Authentication failed
    res.setHeader('WWW-Authenticate', 'Basic realm="Admin Access"');
    return res.status(401).send('Authentication failed');
  }
};

module.exports = {
  basicAuth
};