# syntax=docker/dockerfile:1.4

FROM node:lts  AS development

ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

WORKDIR /code

ARG PORT=80
ENV PORT $PORT
EXPOSE $PORT 9229 9230

COPY package.json /code/package.json
COPY package-lock.json /code/package-lock.json
RUN npm ci

COPY . /code
RUN npm run build

CMD [ "node", "-r module-alias/register", "./dist", "--env=$NODE_ENV" ]