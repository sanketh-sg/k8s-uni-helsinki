# Use an official Node.js runtime as a parent image
FROM node:20-alpine

RUN npm install -g pnpm

# Set the working directory in the container
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN pnpm install

# Copy the rest of the application code
COPY . .

# Expose the application port
EXPOSE 5000

# Start the backend
CMD ["node", "todo-server.js"]
