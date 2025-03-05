# MongoDB Atlas Setup Guide

## Create a MongoDB Atlas Account and Cluster

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and sign up for a free account
2. Create a new project (e.g., "Headshot Signup System")
3. Click "Build a Database" and choose the FREE tier option
4. Select a cloud provider (AWS, GCP, or Azure) and a region close to your users
5. Name your cluster (e.g., "headshot-signup-cluster")
6. Click "Create" and wait for the cluster to be provisioned (may take a few minutes)

## Set Up Database Access

1. In the left sidebar, click "Database Access" under the Security section
2. Click "Add New Database User"
3. Choose "Password" for Authentication Method
4. Create a new username and a secure password
   - **Write down these credentials - you'll need them for your connection string**
   - Set User Privileges to "Atlas admin" for simplicity
5. Click "Add User"

## Configure Network Access

1. In the left sidebar, click "Network Access" under the Security section
2. Click "Add IP Address"
3. For development, you can click "Allow Access from Anywhere" (not recommended for production)
   - Or add your specific IP address
4. Click "Confirm"

## Get Your Connection String

1. Go back to the Database deployments page by clicking "Database" in the left sidebar
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Select "Node.js" and the latest version
5. Copy the connection string - it will look something like:
   ```
   mongodb+srv://<username>:<password>@<cluster-name>.<identifier>.mongodb.net/<database-name>?retryWrites=true&w=majority
   ```
6. Replace `<username>` and `<password>` with the credentials you created earlier
7. Replace `<database-name>` with "headshot-signup" or another name of your choice

## Update Your .env File

1. Open your `.env` file in the project
2. Replace the MONGODB_URI value with your new connection string
3. Save the file

## Test the Connection

Run this command to test your database connection:
```
node test-db-connection.js
```

If successful, you should see "Successfully connected to MongoDB!" in the output.

## Common Issues

1. **Authentication Error**: Double-check your username and password in the connection string
2. **Network Access Error**: Make sure your IP address is allowed in Network Access
3. **Cluster Not Available**: Make sure your cluster is fully deployed and not paused