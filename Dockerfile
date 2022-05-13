FROM node:16.13.0-alpine3.12
ENV NODE_VERSION 14.18.1
WORKDIR /src
COPY ./ /src
RUN yarn install && \
    yarn upgrade && \
    yarn cache clean

EXPOSE 3000
ENV CI=true