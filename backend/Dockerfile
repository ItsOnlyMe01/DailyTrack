# 1. Use Node.js official image
FROM node:20-slim

# 2. Set working directory inside container
WORKDIR /app

# 3. Copy package files first (for better caching)
COPY package*.json ./

# 4. Install dependencies
RUN npm install

# 5. Copy rest of your code
COPY . .

# 6. Expose the port your app uses
EXPOSE 3000

# 7. Command to start your app
CMD ["node", "server.js"]