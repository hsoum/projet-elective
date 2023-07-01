# Base image
FROM node:16-alpine

# Set the working directory
WORKDIR /app

# Copy the component files into the container
COPY . /app/components

# Expose the volume for sharing with other containers (optional)
VOLUME ["/app/components"]

# Container startup command (optional)
CMD ["echo", "Vue.js component storage container is running."]