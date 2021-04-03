FROM node:14.15.5-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN apk update \
    && npm install -g npm@6.14.11 @vue/cli@4.5.11 \
    && npm install