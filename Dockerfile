# Use official Node.js image as base
FROM node:18

# Set working directory in container
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy all project files
COPY . .

# Expose port (NestJS thường chạy ở port 3000)
EXPOSE 3000

# Command để chạy app
CMD ["npm", "run", "start"]
