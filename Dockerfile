FROM node:18-slim

WORKDIR /app

COPY package*.json ./

# Install dependencies
RUN npm install

# Copy application files
COPY . .

# Expose the port
EXPOSE 8080

# Define the command to run
CMD ["node", "server.js"]