FROM golang:1.19.0-alpine3.16 as build-reflex
RUN apk update && \
    apk upgrade && \
    apk add bash git && \
    rm -rf /var/cache/apk/*

RUN go install github.com/cespare/reflex@latest

FROM golang:1.19.0-alpine3.16
COPY --from=build-reflex /go/bin/reflex /go/bin/reflex

RUN apk update && \
    apk upgrade && \
    apk add bash git build-base jq && \
    rm -rf /var/cache/apk/*

ENV GOOS=linux \
    GOARCH=amd64 \
    CGO_ENABLED=0

WORKDIR /app

COPY go.mod .
COPY go.sum .
RUN go mod download

COPY . .

RUN go build -o /backend-api ./server.go
