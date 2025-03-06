# Deploying to Render

## Setting Up Your Render Account

1. Sign up for a free account at [render.com](https://render.com)
2. After signing in, create a new Web Service

## Manual Deployment Steps

1. Connect your GitHub repository to Render
   - Click "New" and select "Web Service"
   - Connect your GitHub account if prompted
   - Select your headshot-signup-system repository

2. Configure your service:
   - **Name**: headshot-signup-system (or any name you prefer)
   - **Environment**: Node
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Instance Type**: Free

3. Add Environment Variables:
   - `NODE_ENV`: production
   - `USE_MEMORY_DB`: false
   - `PORT`: 10000 (Render will set this automatically, but it's good to specify)
   - `MONGODB_URI`: Your MongoDB Atlas connection string
   - `BASE_URL`: This will be your Render URL (once deployed)
   - `ADMIN_USERNAME`: admin
   - `ADMIN_PASSWORD`: Your secure password
   - `CSRF_TOKEN`: Your secure token

4. Click "Create Web Service"

## Using the render.yaml File

Alternatively, you can use the render.yaml file in this repository:

1. In your Render dashboard, click "Blueprint" from the sidebar
2. Connect your repository
3. Render will automatically detect the render.yaml file and create services based on it
4. You'll still need to set any secret environment variables manually

## After Deployment

1. Once deployed, copy your Render URL from the dashboard
2. Go to your service's "Environment" section and update `BASE_URL` to match this URL
3. Trigger a new deployment for the change to take effect

## Important Notes

- The free tier of Render has some limitations:
  - Your service will spin down after periods of inactivity
  - It may take a moment to spin back up on the first request
- For production use, consider upgrading to a paid plan to ensure consistent performance

## Checking Logs and Troubleshooting

1. From your Render dashboard, select your service
2. Click on "Logs" to view live application logs
3. If you encounter database connection issues, verify your MongoDB Atlas settings:
   - Check IP access control settings (whitelist Render's IPs or allow all IPs)
   - Verify your connection string and credentials