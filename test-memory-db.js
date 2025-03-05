require('dotenv').config();
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

async function testMemoryDb() {
  console.log('Starting MongoDB Memory Server...');
  
  // Create an in-memory MongoDB instance
  const mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  
  console.log('MongoDB Memory Server started at:', mongoUri);
  
  // Connect to the in-memory database
  await mongoose.connect(mongoUri);
  console.log('Connected to in-memory MongoDB!');
  
  // Define a test model
  const TestModel = mongoose.model('TestModel', new mongoose.Schema({
    name: String,
    createdAt: { type: Date, default: Date.now }
  }));
  
  // Create some test data
  console.log('Creating test document...');
  const testDoc = await TestModel.create({ name: 'Test entry' });
  console.log('Created document:', testDoc);
  
  // Retrieve it to verify
  const retrievedDoc = await TestModel.findById(testDoc._id);
  console.log('Retrieved document:', retrievedDoc);
  
  // Clean up
  console.log('Cleaning up...');
  await mongoose.disconnect();
  await mongoServer.stop();
  
  console.log('Test completed successfully!');
}

// Run the test
testMemoryDb()
  .then(() => {
    console.log('In-memory MongoDB test passed!');
    process.exit(0);
  })
  .catch(err => {
    console.error('Error during test:', err);
    process.exit(1);
  });