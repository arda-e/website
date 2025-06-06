FROM --platform=linux/arm64 node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY . .

EXPOSE 80

CMD ["node", "src/server.js"]