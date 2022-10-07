FROM node:lts-alpine

LABEL org.opencontainers.image.authors="ianlcz"

RUN addgroup -S homemovie && adduser -S homemovie -G homemovie

WORKDIR /home/homemovie

USER homemovie

COPY --chown=homemovie . .

RUN npm install
RUN cd api/ && npm install

EXPOSE 3000 8080

CMD [ "npm", "run", "start" ]