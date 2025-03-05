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

## Deployment to Vercel

### Prerequisites

1. A [Vercel](https://vercel.com) account
2. A [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) database
3. A [GitHub](https://github.com) account

### Steps to Deploy

1. Set up your GitHub repository:
   - Create a new GitHub repository
   - Push this codebase to your GitHub repository using the commands:
     ```
     git remote add origin https://github.com/YOUR_USERNAME/headshot-signup-system.git
     git push -u origin main
     ```

2. Set up MongoDB Atlas:
   - Create a MongoDB Atlas account and set up a free cluster
   - Create a database user and get your connection string
   - Update your `.env` file with the real MongoDB connection string

3. Deploy to Vercel:
   - Go to [vercel.com](https://vercel.com) and sign up or log in
   - Click "Add New" > "Project"
   - Import your GitHub repository
   - Configure the project:
     - Framework Preset: Other
     - Root Directory: ./
     - Build Command: npm install
     - Output Directory: public
   - Configure environment variables:
     - Copy all variables from your `.env` file
     - Ensure MONGODB_URI has your actual MongoDB Atlas connection string
     - Set NODE_ENV to "production"
   - Deploy!

4. For subsequent deployments after making changes:
   - Commit and push your changes to GitHub
   - Vercel will automatically deploy the updates

For more detailed instructions, see the [DEPLOYMENT.md](DEPLOYMENT.md) file.

## Local Development

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file based on `.env.example`
4. Start the development server:
   ```
   npm run dev
   ```

## Testing

```
npm test
```

## License

MIT