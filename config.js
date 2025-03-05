// Application configuration
const config = {
  // Server settings
  server: {
    port: process.env.PORT || 3000,
    host: process.env.HOST || 'localhost',
    baseUrl: process.env.BASE_URL || `http://localhost:${process.env.PORT || 3000}`,
    environment: process.env.NODE_ENV || 'development',
  },
  
  // Application settings
  app: {
    name: process.env.APP_NAME || 'Faculty & Staff Headshot Signup',
    adminContact: process.env.ADMIN_CONTACT || 'photography@example.edu',
  },
  
  // MongoDB configuration
  database: {
    uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/headshotSignup',
  },
  
  // Authentication
  auth: {
    adminUsername: process.env.ADMIN_USERNAME || 'admin',
    adminPassword: process.env.ADMIN_PASSWORD || 'headshot2025',
    csrfToken: process.env.CSRF_TOKEN || 'headshot-signup-token',
  },
  
  // For formatting URLs in emails and templates
  getFullUrl: function(path) {
    return `${this.server.baseUrl}${path}`;
  }
};

module.exports = config;