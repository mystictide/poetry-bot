FROM node:18.12.1

WORKDIR /app

COPY package*.json ./

RUN npm ci --only=production

COPY . .

EXPOSE 4141

CMD [ "node", "server/server.js" ]