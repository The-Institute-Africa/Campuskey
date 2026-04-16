.PHONY: dev dev-detach dev-down dev-logs dev-restart build-backend build-frontend build-all test-backend test-frontend test-all clean prune shell-backend shell-frontend shell-db status env-copy

ifeq ($(OS),Windows_NT)
DOCKER = docker.exe
else
DOCKER = docker
endif

COMPOSE_DEV = $(DOCKER) compose -f docker/docker-compose.yml -f docker/docker-compose.dev.yml
COMPOSE_PROD = $(DOCKER) compose -f docker/docker-compose.yml -f docker/docker-compose.prod.yml

## ─── Development ───────────────────────────────────────────
dev:
	$(COMPOSE_DEV) up --build
dev-detach:
	$(COMPOSE_DEV) up --build -d
dev-down:
	$(COMPOSE_DEV) down
dev-logs:
	$(COMPOSE_DEV) logs -f
dev-restart:
	$(COMPOSE_DEV) restart $(service)

## ─── Build ─────────────────────────────────────────────────
build-backend:
	$(DOCKER) build -f docker/Dockerfile.backend -t campuskey-backend:latest ./backend/campuskey-backend
build-frontend:
	$(DOCKER) build -f docker/Dockerfile.frontend -t campuskey-frontend:latest ./frontend/campuskey
build-all: build-backend build-frontend

## ─── Testing ───────────────────────────────────────────────
test-backend:
	$(COMPOSE_DEV) exec backend mvn test
test-frontend:
	$(COMPOSE_DEV) exec frontend npm test
test-all: test-backend test-frontend

## ─── Cleanup ───────────────────────────────────────────────
clean:
	$(COMPOSE_DEV) down -v --rmi local --remove-orphans
prune:
	$(DOCKER) system prune -af --volumes

## ─── Utility ───────────────────────────────────────────────
shell-backend:
	$(COMPOSE_DEV) exec backend /bin/sh
shell-frontend:
	$(COMPOSE_DEV) exec frontend /bin/sh
shell-db:
	$(COMPOSE_DEV) exec database mysql -u root -p
status:
	$(COMPOSE_DEV) ps
env-copy:
	cp .env.example .env
