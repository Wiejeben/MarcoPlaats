FROM node:argon

WORKDIR /app

RUN npm install nodemon -g

COPY package.json /app/package.json
RUN npm install

COPY server.js /app

EXPOSE 8080