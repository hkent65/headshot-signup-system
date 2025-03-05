const ngrok = require('ngrok');
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Save the URL to a file so we can reference it later
const saveUrl = (url) => {
  const filePath = path.join(__dirname, 'ngrok-url.txt');
  fs.writeFileSync(filePath, `Your ngrok URL: ${url}\nCreated at: ${new Date().toLocaleString()}`);
  console.log(`URL saved to ${filePath}`);
};

// Start ngrok and connect to our application
async function startNgrok() {
  try {
    console.log('Starting ngrok tunnel...');
    
    // Check if the server is running
    try {
      execSync('lsof -i:3000', { stdio: 'ignore' });
      console.log('Server is running on port 3000');
    } catch (error) {
      console.log('Server not detected on port 3000. Starting the server...');
      // Start the server in the background
      require('./server.js');
      console.log('Server started on port 3000');
    }
    
    // Connect to ngrok
    const url = await ngrok.connect({
      addr: 3000,
      region: 'us', // or 'eu', 'au', 'ap', 'sa', 'jp', 'in'
    });
    
    console.log(`
╔════════════════════════════════════════════════════════╗
║                                                        ║
║  Your headshot signup system is now accessible at:     ║
║                                                        ║
║  ${url.padEnd(52)}║
║                                                        ║
╚════════════════════════════════════════════════════════╝

Admin page: ${url}/admin.html
Username: admin
Password: headshot2025 (or your custom password if set)

Press Ctrl+C to stop the tunnel and server.
`);

    // Save the URL to a file
    saveUrl(url);
    
  } catch (error) {
    console.error('Error starting ngrok:', error);
  }
}

// Clean up function for when the process is terminated
const cleanup = async () => {
  console.log('\nShutting down ngrok tunnel...');
  await ngrok.kill();
  console.log('Ngrok tunnel closed.');
  process.exit(0);
};

// Handle termination signals
process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);

// Start ngrok
startNgrok();