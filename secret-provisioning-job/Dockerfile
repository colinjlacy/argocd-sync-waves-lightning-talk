FROM node:18-alpine3.20
LABEL authors="Colin.Lacy"

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

ENV NODE_TLS_REJECT_UNAUTHORIZED=0

CMD ["node", "src/index.js"]