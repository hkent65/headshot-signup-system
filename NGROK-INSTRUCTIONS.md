# Headshot Signup System - Sharing Instructions

## Setup (One-time only)

1. Create a free account at https://ngrok.com/signup
2. Get your auth token from https://dashboard.ngrok.com/get-started/your-authtoken
3. Run `node ngrok-setup.js` and enter your token when prompted

## Sharing the Application

To make the application accessible over the internet:

1. Run: `npm run share`
2. The public URL will be displayed in the console and saved to `ngrok-url.txt`
3. Share this URL with your users

## Admin Access

Access the admin dashboard at `your-ngrok-url/admin.html`

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
