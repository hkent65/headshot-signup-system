require('dotenv').config();
const mongoose = require('mongoose');

console.log('Testing MongoDB connection...');
console.log('Connection string (masked):', process.env.MONGODB_URI?.replace(/:([^:@]+)@/, ":****@"));

// Try to connect
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Successfully connected to MongoDB!');
    console.log('Connection details:', mongoose.connection.host);
    
    // Create a simple model and test it
    const TestModel = mongoose.model('TestModel', new mongoose.Schema({
      name: String,
      testDate: { type: Date, default: Date.now }
    }));
    
    // Create a test document
    return TestModel.create({ name: 'Test entry' })
      .then(doc => {
        console.log('Successfully created test document:', doc);
        return TestModel.findByIdAndDelete(doc._id);
      })
      .then(() => {
        console.log('Successfully deleted test document');
        console.log('Database connection and operations working correctly!');
      });
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
    
    // Provide more detailed troubleshooting
    if (err.name === 'MongoNetworkError' || err.message.includes('ENOTFOUND')) {
      console.error('\nPossible issues:');
      console.error('1. Network connectivity issue');
      console.error('2. MongoDB Atlas IP whitelist - make sure your IP is allowed');
      console.error('3. Incorrect hostname in connection string');
    } else if (err.name === 'MongoServerSelectionError') {
      console.error('\nPossible issues:');
      console.error('1. MongoDB Atlas cluster is paused or unavailable');
      console.error('2. DNS resolution issue');
    } else if (err.message.includes('Authentication failed')) {
      console.error('\nPossible issues:');
      console.error('1. Incorrect username/password in connection string');
      console.error('2. User does not have permissions for this database');
    }
  })
  .finally(() => {
    mongoose.disconnect();
  });