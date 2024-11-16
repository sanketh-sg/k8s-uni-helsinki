# Use Node.js base image
FROM node:20-alpine

# Install pnpm
RUN npm install -g pnpm

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and install dependencies
COPY package*.json ./

# Install dependencies using pnpm
RUN pnpm install

# Copy all files
COPY . .

# Expose the port and start the application
EXPOSE 3000
CMD ["node", "server.js"]