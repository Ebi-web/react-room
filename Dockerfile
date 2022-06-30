FROM node:16.13.0-alpine3.12
ENV NODE_VERSION 14.18.1

#copy application code
COPY ./ /src

#install required packages
WORKDIR /src
RUN yarn install && \
    yarn upgrade && \
    yarn cache clean && \
    apk --update --upgrade --no-cache add git bash make grep  && \
    git clone https://github.com/awslabs/git-secrets.git && \
    cp .gitconfig ~

#setup git-secrets
WORKDIR git-secrets
RUN make install && \
    git secrets --register-aws --global

EXPOSE 3000
ENV CI=true