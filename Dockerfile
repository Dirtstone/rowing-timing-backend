FROM node:16 AS build-ui
WORKDIR /ui
COPY ./ui/package.json /ui
COPY ./ui/quasar.config.js /ui
RUN npm install -g @quasar/cli
RUN npm install
COPY ./ui /ui
RUN quasar build

FROM node:16 as build-api
WORKDIR /app
COPY ./api/package.json .
RUN npm install
RUN npm install -g typescript
ADD ./api .
RUN tsc -p .

FROM node:16
WORKDIR /usr/src/app/api
COPY ./api/package.json .
RUN npm install --production
COPY --from=build-ui /ui/dist/spa /usr/src/app/ui/dist/spa
COPY --from=build-api /app/dist/ /usr/src/app/api
RUN ls
COPY ./api/data/ ./data
CMD ["node", "index.js"]