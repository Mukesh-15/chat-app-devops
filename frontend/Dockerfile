# Use Node LTS
FROM node:18

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy frontend source
COPY . .

# Build frontend (if using React)
RUN npm run build

# Expose port
EXPOSE 3000

# Start frontend (adjust if using a different start script)
CMD ["npm", "start"]
