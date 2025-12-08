FROM golang:1.25-alpine AS base

WORKDIR /app
RUN apk add --no-cache git curl sqlite

RUN go install github.com/air-verse/air@latest

COPY go.mod go.sum ./
RUN go mod download

RUN apk add --no-cache sqlite-libs

COPY . .

FROM base AS dev

CMD ["air", "-c", ".air.toml"]

FROM base AS prod

RUN CGO_ENABLED=1 GOOS=linux go build -o server .

CMD ["./server"]

# FROM golang:1.25-alpine AS build
# WORKDIR /app
# RUN apk add --no-cache git
# COPY go.mod go.sum ./
# RUN go mod download
# COPY . .
# RUN CGO_ENABLED=1 GOOS=linux go build -o server .

# FROM alpine:3.18
# RUN apk add --no-cache sqlite-libs
# WORKDIR /app
# COPY --from=build /app/server .
# # montiamo il file DB via volume o bind (vedi compose)
# ENV DB_PATH=/data/sqlite.db PORT=8080
# EXPOSE 8080
# CMD ["./server"]