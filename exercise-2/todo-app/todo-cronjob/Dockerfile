FROM node:20-alpine

# Install pnpm
RUN npm install -g pnpm

# Create and change to the app directory.
WORKDIR /usr/src/app

# Copy application dependency manifests to the container image.
COPY package*.json ./

# Install dependencies using pnpm
RUN pnpm install

# Copy application code
COPY generate-todo.js .

# Start the application
CMD ["node", "generate-todo.js"]
