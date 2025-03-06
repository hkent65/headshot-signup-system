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

## Deployment to Fly.io

### Prerequisites

1. A [Fly.io](https://fly.io) account
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

3. Install the Fly.io CLI:
   - Mac/Linux: `curl -L https://fly.io/install.sh | sh`
   - Windows: Download the installer from the Fly.io website
   - Or use Homebrew: `brew install flyctl`

4. Deploy to Fly.io:
   - Authenticate: `fly auth login`
   - Initialize (first time only): `fly launch`
   - Set secrets:
     ```
     fly secrets set MONGODB_URI="your-mongodb-connection-string"
     fly secrets set ADMIN_USERNAME="admin"
     fly secrets set ADMIN_PASSWORD="your-password"
     fly secrets set BASE_URL="https://your-app-name.fly.dev"
     ```
   - Deploy: `fly deploy`

5. After deployment:
   - Open your app: `fly open`
   - Access the admin dashboard at your-fly-url/admin.html
   - Monitor with: `fly logs` and `fly status`

For more detailed instructions, see the [FLY-SETUP.md](FLY-SETUP.md) file.

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