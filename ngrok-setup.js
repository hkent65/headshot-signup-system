const readline = require('readline');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

// Create readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Prompt for ngrok auth token
console.log('\n============================================');
console.log('  NGROK SETUP FOR HEADSHOT SIGNUP SYSTEM  ');
console.log('============================================\n');

console.log('To share your application over the internet, you need to:');
console.log('1. Create a free account at https://ngrok.com/signup');
console.log('2. Get your auth token from https://dashboard.ngrok.com/get-started/your-authtoken');
console.log('3. Enter that token below\n');

rl.question('Enter your ngrok auth token (press Enter to skip if already configured): ', (token) => {
  if (token && token.trim() !== '') {
    // Set the auth token
    exec(`npx ngrok authtoken ${token.trim()}`, (error, stdout, stderr) => {
      if (error) {
        console.error('Error setting auth token:', error);
        console.log('You may need to install ngrok manually. Visit https://ngrok.com/download');
      } else {
        console.log('\n✓ Auth token configured successfully!');
      }
      completeSetup();
    });
  } else {
    console.log('\nSkipping auth token configuration.');
    completeSetup();
  }
});

function completeSetup() {
  console.log('\n============================================');
  console.log('  HOW TO START THE SHARED APPLICATION  ');
  console.log('============================================\n');
  console.log('To start sharing your application:');
  console.log('1. Run: npm run share');
  console.log('2. The public URL will be displayed in the console');
  console.log('3. Anyone with the URL can access your application');
  console.log('\nAdmin credentials:');
  console.log('Username: admin');
  console.log('Password: headshot2025 (or your custom password if set)');
  console.log('\nTo stop sharing, press Ctrl+C in the terminal.');
  console.log('\nNOTE: The URL will change each time you restart the tunnel (free ngrok plan limitation).\n');
  
  rl.close();
}

// Instructions file
const instructionsPath = path.join(__dirname, 'NGROK-INSTRUCTIONS.md');
const instructions = `# Headshot Signup System - Sharing Instructions

## Setup (One-time only)

1. Create a free account at https://ngrok.com/signup
2. Get your auth token from https://dashboard.ngrok.com/get-started/your-authtoken
3. Run \`node ngrok-setup.js\` and enter your token when prompted

## Sharing the Application

To make the application accessible over the internet:

1. Run: \`npm run share\`
2. The public URL will be displayed in the console and saved to \`ngrok-url.txt\`
3. Share this URL with your users

## Admin Access

Access the admin dashboard at \`your-ngrok-url/admin.html\`

- Username: admin
- Password: headshot2025 (or your custom password if set)

## Important Notes

- The free version of ngrok will assign a new URL each time you restart the tunnel
- The tunnel will close if you shut down your computer or press Ctrl+C
- Data will persist in your local MongoDB database

## Troubleshooting

If you encounter issues:

1. Make sure the MongoDB service is running
2. Check that port 3000 is not in use by another application
3. Review the ngrok console output for any error messages
4. Ensure your ngrok authtoken is correctly configured
`;

fs.writeFileSync(instructionsPath, instructions);
console.log(`Instructions saved to ${instructionsPath}`);