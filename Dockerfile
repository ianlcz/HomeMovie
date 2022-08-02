FROM node:lts-alpine

LABEL maintainer="ianlcz.io"

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN cd ./api && npm install

EXPOSE 3000

CMD ["npm", "run", "start"]