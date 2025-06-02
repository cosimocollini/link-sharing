.PHONY: dev build run test lint docker-build

dev:
	make -j2 run-backend dev-frontend

build:
	make build-backend
	make build-frontend

run-backend:
	go run ./cmd/server

build-backend:
	cd backend/ && go build -o out && ./out

test:
	go test ./...

dev-frontend:
	cd frontend && npm run dev

build-frontend:
	cd frontend && npm run build

lint:
	cd frontend && npm run lint

docker-build:
	docker compose up