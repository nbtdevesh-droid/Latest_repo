# Use official Node 22 image

FROM node:22
 
# Set working directory

WORKDIR /app
 
# Copy package files and install deps

COPY package*.json ./

RUN npm install
 
# Copy the entire source

COPY . .
 
# Build the Next.js app

RUN npm run build
 
# Expose default Next.js production port

EXPOSE 3000
 
# Start app in production

CMD ["npm", "start"]
 