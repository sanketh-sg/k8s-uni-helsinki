# Use the official lightweight Node.js image.
FROM node:20-alpine

# Install pnpm
RUN npm install -g pnpm

# Create and change to the app directory.
WORKDIR /usr/src/app

# Copy application dependency manifests to the container image.
COPY package*.json ./

# Install dependencies using pnpm
RUN pnpm install

# Copy local code to the container image.
COPY . .

# Run the web service on container startup.
CMD [ "node", "main.js" ]