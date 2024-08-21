# Use an official Node.js runtime as a parent image
FROM node:20

# Set the working directory in the container
WORKDIR /usr/app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install dependencies
RUN pnpm install

# Copy the rest of the application code to the container
COPY . .

# Build the Next.js application
RUN pnpm run build

# Expose the port on which the Next.js app will run
EXPOSE 3000

# Command to run the Next.js application in production mode
CMD ["npm", "start"]
