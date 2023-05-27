FROM node:12.13.0-alpine as build
WORKDIR /ui
COPY ./ui/package.json .
COPY ./ui/yarn.lock .
RUN npm install
COPY ./ui .
RUN quasar build

FROM node:16
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install

COPY --from=build /ui/dist/spa ./ui/dist/spa
COPY ./api ./api

CMD ["cd", "api", "&&", "ts-node", "index.ts"]