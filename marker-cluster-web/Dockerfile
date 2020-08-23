# Use a lighter version of Node as a parent image
FROM node:12.2.0-alpine as client

# Set the working directory to /client
WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

# copy package.json into the container at /app
COPY package*.json /app/

# install dependencies
RUN npm install --silent

RUN npm install react-scripts -g --silent

# Copy the current directory contents into the container at /app
COPY . .

# Build the application
RUN npm run build

# Build nginx:server
FROM nginx:latest

EXPOSE 80

# Copy everything from build dir inte the web root
COPY --from=client /app/build/ /var/www/html

COPY ./nginx/default.conf /etc/nginx/conf.d

CMD ["nginx", "-g", "daemon off;"]