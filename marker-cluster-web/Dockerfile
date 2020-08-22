# Use a lighter version of Node as a parent image
FROM mhart/alpine-node:12.18.2

# Set the working directory to /client
WORKDIR /marker-cluster-web

# copy package.json into the container at /marker-cluster-web
COPY package*.json /marker-cluster-web/

# install dependencies
RUN npm install

# Copy the current directory contents into the container at /marker-cluster-web
COPY . /marker-cluster-web/

# Make port 3000 available to the world outside this container
EXPOSE 3000

# Run the app when the container launches
CMD ["npm", "start"]