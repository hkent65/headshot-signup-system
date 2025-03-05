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

### Steps to Deploy

1. Fork or clone this repository to your GitHub account
2. Install the Vercel CLI:
   ```
   npm i -g vercel
   ```
3. Login to Vercel:
   ```
   vercel login
   ```
4. Configure environment variables in Vercel:
   - Create a MongoDB Atlas database and get your connection string
   - Set up all environment variables listed in `.env.example`

5. Deploy to Vercel:
   ```
   vercel
   ```

6. For production deployment:
   ```
   vercel --prod
   ```

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