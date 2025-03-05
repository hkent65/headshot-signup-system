# Deployment Guide

## Setting up GitHub

1. Create a new GitHub repository:
   - Go to [GitHub](https://github.com) and log in
   - Click the "+" icon in the top right corner and select "New repository"
   - Name your repository (e.g., "headshot-signup-system")
   - Choose public or private visibility
   - Click "Create repository"

2. Push your local code to GitHub:
   ```bash
   # If you haven't already set up the remote
   git remote add origin https://github.com/YOUR_USERNAME/headshot-signup-system.git
   
   # Push your code to GitHub
   git push -u origin main
   ```

## Setting up MongoDB Atlas

1. Create a MongoDB Atlas account at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster (the free tier is sufficient for testing)
3. Create a database user with read/write permissions
4. Add your IP address to the network access list or set it to allow access from anywhere
5. Click "Connect" on your cluster, then "Connect your application"
6. Copy the connection string and replace `<username>`, `<password>`, and `<dbname>` with your actual username, password, and database name

## Deploying to Vercel

1. Sign up for a Vercel account at [vercel.com](https://vercel.com)
2. Install the Vercel CLI:
   ```bash
   npm install -g vercel
   ```

3. Log in to Vercel from the CLI:
   ```bash
   vercel login
   ```

4. Deploy your app from your project directory:
   ```bash
   vercel
   ```

5. During deployment, Vercel will ask for configuration options. You can:
   - Link to your existing project or create a new one
   - Set the project name
   - Confirm the root directory (usually the current directory)

6. Set up environment variables in Vercel:
   - Go to your project dashboard on Vercel
   - Navigate to "Settings" > "Environment Variables"
   - Add all the variables from your `.env` file, especially:
     - MONGODB_URI (with your MongoDB Atlas connection string)
     - NODE_ENV (set to "production")
     - BASE_URL (will be your Vercel deployment URL)
     - ADMIN_USERNAME
     - ADMIN_PASSWORD
     - CSRF_TOKEN

7. For production deployment:
   ```bash
   vercel --prod
   ```

## Troubleshooting

- If you encounter database connection issues, make sure:
  - Your MongoDB Atlas connection string is correct
  - Your IP address is whitelisted in MongoDB Atlas
  - Your database user has the correct permissions

- If you encounter build errors in Vercel:
  - Check the build logs in your Vercel dashboard
  - Ensure all required dependencies are listed in package.json
  - Verify that your Node.js version is compatible (add "engines" field to package.json if needed)