FROM node:14-slim

WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm install
COPY app.js .

EXPOSE 4000

CMD ["node", "app.js"]
