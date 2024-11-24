# Use an official Node.js runtime as a parent image
FROM node:20-alpine AS build

RUN npm install -g pnpm
# Set the working directory in the container
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN pnpm install

# Copy the rest of the application code
COPY . .

# Build the app
RUN pnpm run build

# Use a lightweight web server to serve the built files
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html

# Expose the port that NGINX listens on
EXPOSE 80

# Start NGINX server
CMD ["nginx", "-g", "daemon off;"]
