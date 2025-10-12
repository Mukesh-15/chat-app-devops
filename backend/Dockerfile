# Use Node LTS
FROM node:18

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy app source
COPY . .

# Expose port (matches backend .env)
EXPOSE 5500

# Start the app
CMD ["node", "index.js"]
