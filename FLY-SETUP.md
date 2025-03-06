# Deploying to Fly.io

This guide explains how to deploy your Headshot Signup System to Fly.io.

## Installing the Fly CLI

1. Install the Fly.io CLI:
   - Mac/Linux: `curl -L https://fly.io/install.sh | sh`
   - Windows: Download the installer from the Fly.io website
   - Alternatively, use Homebrew: `brew install flyctl`

2. Authenticate with Fly.io:
   ```
   fly auth login
   ```

## Deploy Your Application

1. Initialize your Fly.io app (if you haven't created one yet):
   ```
   fly launch
   ```
   - This will guide you through creating a new app
   - Choose "No" when asked if you want to deploy now

2. Set up secrets for your MongoDB connection and other environment variables:
   ```
   fly secrets set MONGODB_URI="mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority"
   fly secrets set ADMIN_USERNAME="admin"
   fly secrets set ADMIN_PASSWORD="your-secure-password"
   fly secrets set CSRF_TOKEN="your-secure-token"
   fly secrets set BASE_URL="https://your-app-name.fly.dev"
   fly secrets set APP_NAME="Faculty & Staff Headshot Signup"
   fly secrets set ADMIN_CONTACT="photography@example.edu"
   ```

3. Deploy your application:
   ```
   fly deploy
   ```

4. Open your deployed application:
   ```
   fly open
   ```

## Scaling Your Application

By default, Fly.io will deploy 1 instance of your application. You can scale up as needed:

```
fly scale count 2  # Deploy 2 instances for redundancy
```

## Monitoring and Logs

To view your application logs:

```
fly logs
```

To monitor your application's status:

```
fly status
```

## Updating Your Application

After making changes to your application:

1. Commit your changes to Git
2. Run `fly deploy` to deploy the updated version

## Custom Domains

To add a custom domain to your Fly.io app:

1. Add the domain:
   ```
   fly domains add your-domain.com
   ```

2. Follow the DNS instructions provided by Fly.io to configure your domain

## Troubleshooting

If you encounter issues with your deployment:

1. Check your application logs: `fly logs`
2. Verify your secrets are set correctly: `fly secrets list`
3. Check your application status: `fly status`
4. Ensure your MongoDB Atlas whitelist includes Fly.io's IP ranges or allows access from anywhere