FROM node:16 AS build
WORKDIR /ui
COPY ./ui/package.json .
COPY ./ui/yarn.lock .
RUN npm install
COPY ./ui /ui
RUN quasar build

FROM node:16
WORKDIR /usr/src/app
COPY ./api/package.json .
COPY ./ui/yarn.lock .
RUN npm install

COPY --from=build /ui/dist/spa ./ui/dist/spa
COPY ./api ./api

CMD ["cd", "api", "&&", "ts-node", "index.ts"]