FROM node:17-alpine

WORKDIR /app
COPY package*.json /app

RUN npm i --silent
RUN npm i -g expo@49.0.3

COPY . ./


CMD [ "npm", "start" ]