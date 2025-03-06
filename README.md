# Faculty & Staff Headshot Signup System

A web application for scheduling faculty and staff professional headshots.

## Features

- Faculty and staff can book appointment slots for headshot sessions
- Admin dashboard to manage and track appointments
- User authentication and data validation
- Responsive design for all devices

## Tech Stack

- Node.js and Express.js backend
- MongoDB for data storage
- Vanilla JavaScript frontend
- Responsive CSS

## Deployment to Render

### Prerequisites

1. A [Render](https://render.com) account
2. A [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) database
3. A [GitHub](https://github.com) account

### Steps to Deploy

1. Set up your GitHub repository:
   - Create a new GitHub repository
   - Push this codebase to your GitHub repository

2. Set up MongoDB Atlas:
   - Create a MongoDB Atlas account and set up a free cluster
   - Create a database user and get your connection string
   - In Network Access, either:
     - Add your specific IP address
     - Allow access from anywhere (0.0.0.0/0) for easiest setup

3. Deploy to Render:
   - Go to [render.com](https://render.com) and sign up or log in
   - Click "New" > "Web Service"
   - Connect your GitHub repository
   - Configure the project:
     - Name: headshot-signup-system (or your preferred name)
     - Environment: Node
     - Build Command: `npm install && npm run build`
     - Start Command: `npm start`
   - Configure environment variables:
     - NODE_ENV: production
     - USE_MEMORY_DB: false
     - MONGODB_URI: (your MongoDB Atlas connection string)
     - BASE_URL: https://headshot-signup-system.onrender.com (or your actual Render URL)
     - ADMIN_USERNAME: admin (or your preferred admin username)
     - ADMIN_PASSWORD: (your secure password)
     - CSRF_TOKEN: (your secure token)
   - Deploy!

4. After deployment:
   - Verify your application is accessible at your Render URL
   - Access the admin dashboard at your-render-url/admin.html
   - If you need to make changes to environment variables, redeploy after saving them

For more detailed instructions, see the [RENDER-SETUP.md](RENDER-SETUP.md) file.

## Local Development

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file based on `.env.example`
4. Database options:
   - **Option 1 (Recommended)**: Use MongoDB Atlas (see [MONGODB-SETUP.md](MONGODB-SETUP.md))
   - **Option 2 (Dev only)**: Use in-memory MongoDB (already configured)
5. Test your database connection:
   ```
   npm run test-db        # Test real MongoDB connection
   npm run test-memory-db # Test in-memory MongoDB
   ```
6. Start the development server:
   ```
   npm run dev
   ```

## Testing

```
npm test
```

## License

MIT