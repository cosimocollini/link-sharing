FROM golang:1.25-alpine AS build
WORKDIR /app
RUN apk add --no-cache git
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -o server .

FROM alpine:3.18
RUN apk add --no-cache sqlite-libs
WORKDIR /app
COPY --from=build /app/server .
# montiamo il file DB via volume o bind (vedi compose)
ENV DB_PATH=/data/sqlite.db PORT=8080
EXPOSE 8080
CMD ["./server"]

# FROM golang:1.22-alpine

# WORKDIR /app

# RUN go install github.com/air-verse/air@latest

# COPY go.* ./
# RUN go mod download

# COPY . .

# RUN go build -o out .

# EXPOSE 8080

# CMD ["air", "-c", ".air.toml"]
