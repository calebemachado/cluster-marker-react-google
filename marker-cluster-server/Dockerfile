# Use a lighter version of Node as a parent image
FROM node:12.2.0-alpine
# Set the working directory to /app
WORKDIR /app
# copy package.json into the container at /app
COPY package*.json /app/
# install dependencies
RUN npm install
# Copy the current directory contents into the container at /app
COPY . .
# Make port 3333 available to the world outside this container
EXPOSE 3333
# Run the app when the container launches
CMD ["node", "src/index.js"]