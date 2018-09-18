FROM node:10.10.0-alpine

WORKDIR /app
COPY package*.json /app/
RUN npm install
COPY . /app/
RUN npm run build
EXPOSE 3000
CMD [ "node", "Source/Server/ExpressHandler.js" ]