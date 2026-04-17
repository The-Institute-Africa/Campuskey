# CampusKey DevOps Pipeline — Copilot Prompt Engineering Pipeline v1.0

> **Purpose**: A deterministic, staged prompt pipeline for GitHub Copilot to generate the complete Docker development environment and CI/CD infrastructure for CampusKey. Every stage has a **gate** — do NOT proceed to the next stage until the gate condition is satisfied.

---

## CONTEXT LOCK — Re-state Before EVERY Stage

```yaml
project: CampusKey – Student Accommodation Platform
monorepo-root: ./

backend:
  path: backend/campuskey-backend/
  framework: Spring Boot 3.5.4
  language: Java 21
  build-tool: Maven (pom.xml is source of truth; build.gradle exists but pom.xml governs)
  packaging: JAR
  db-prod: MySQL 8.0
  db-dev: H2 (in-memory)
  port: 8080
  devtools: spring-boot-devtools (hot-reload via class reloading)
  profiles: dev | prod
  actuator: enabled

frontend:
  path: frontend/campuskey/
  framework: React 18 + Vite 7
  node-version: 20.19.1 (.nvmrc)
  css: Tailwind CSS 3
  package-manager: npm
  port-dev: 5173
  port-prod: 80 (nginx)
  api-env-var: VITE_API_URL

docker:
  root-dir: docker/
  dockerfiles: docker/Dockerfile.backend, docker/Dockerfile.frontend
  compose-root: docker/docker-compose.yml
  compose-dev: docker/docker-compose.dev.yml
  compose-prod: docker/docker-compose.prod.yml
  service-composes: docker/services/{backend,frontend,database,redis}.compose.yml
  infra-composes: docker/infrastructure/{observability,ai}.compose.yml
  configs: docker/configs/{prometheus.yml, promtail-config.yml, redis.conf}
  local-dockerfiles: backend/campuskey-backend/docker/Dockerfile, frontend/campuskey/docker/Dockerfile

ci-cd:
  platform: GitHub Actions
  workflows-dir: .github/workflows/
  files:
    - ci-cd-pipeline.yml    # main build/test/push pipeline
    - codeql-analysis.yml   # security scanning
    - ai-model-test.yml     # AI model validation

naming-conventions:
  image-registry: ghcr.io
  image-prefix: ghcr.io/<OWNER>/campuskey
  backend-image: ghcr.io/<OWNER>/campuskey-backend
  frontend-image: ghcr.io/<OWNER>/campuskey-frontend
  container-prefix: campuskey-
```

> **IMPORTANT**: `<OWNER>` is a placeholder. Replace with the actual GitHub org/user (`${{ github.repository_owner }}`).

---

## HARD ENFORCEMENT RULES

1. **FILE PARITY**: Every file listed in the `docker:` context block MUST be generated. Do NOT create files outside this list.
2. **SINGLE COMPOSE ENTRY-POINT**: `docker/docker-compose.yml` includes service and infra compose files via `include:`. It is the only file developers invoke directly.
3. **DEV HOT-RELOAD IS MANDATORY**:
   - Backend: Mount `backend/campuskey-backend/src` into the container; rely on `spring-boot-devtools` class-reloading.
   - Frontend: Mount `frontend/campuskey/src` into the container; rely on Vite HMR with `--host 0.0.0.0`.
4. **MULTI-STAGE BUILDS ONLY**: All Dockerfiles MUST use multi-stage builds (builder → runner).
5. **NO SECRETS IN IMAGES**: Secrets come from `.env` files (dev) or GitHub Secrets (CI). Never `COPY .env`.
6. **CI PIPELINE MUST RUN ON**: `push` to `main`/`develop` AND on all `pull_request` events.
7. **ANTI-HALLUCINATION**: Do NOT invent dependencies, ports, or environment variables not listed in Context Lock.
8. **IDEMPOTENCY**: Running `docker compose up` twice must produce the same result. Use `restart: unless-stopped`, named volumes, health-checks.
9. **NETWORK ISOLATION**: All containers share a single bridge network `campuskey-net`.

---

## STAGE 0 — Foundation Files (.dockerignore, .env.example, .gitignore additions)

### Prompt

```
You are generating DevOps infrastructure for the CampusKey monorepo.
Re-read the CONTEXT LOCK above before proceeding.

Generate the following 4 files EXACTLY, with no extra files:

1. `.dockerignore` (project root) — exclude:
   - .git, .github, .idea, node_modules, target, build, .gradle
   - *.log, *.md (except README.md), .env*, uploads/
   - docker/ itself to prevent recursive context

2. `docker/.dockerignore` — exclude:
   - Same as root, relative to docker/ build context

3. `.env.example` (project root) — template for ALL environment variables used
   across compose files. Include comments per section:
   - Database (MYSQL_ROOT_PASSWORD, MYSQL_DATABASE, MYSQL_USER, MYSQL_PASSWORD)
   - Backend (SPRING_PROFILES_ACTIVE, SPRING_DATASOURCE_URL, SPRING_DATASOURCE_USERNAME,
     SPRING_DATASOURCE_PASSWORD, JWT_SECRET, JWT_EXPIRATION_MS)
   - Frontend (VITE_API_URL)
   - Redis (REDIS_PASSWORD)
   - Observability (GRAFANA_ADMIN_PASSWORD) — optional section

4. `.gitignore` additions — append docker-specific ignores:
   - .env, .env.local, .env.*.local
   - docker volumes data (docker/data/)
   - Docker override files (docker-compose.override.yml)
```

### Gate
✅ All 4 files exist and contain no placeholder `TODO` comments.

---

## STAGE 1 — Dockerfiles (Backend + Frontend)

### Prompt

```
You are generating production-grade, multi-stage Dockerfiles for CampusKey.
Re-read the CONTEXT LOCK above before proceeding.

=== FILE 1: docker/Dockerfile.backend ===

Multi-stage build for Spring Boot 3.5.4 / Java 21 / Maven:

Stage 1 — "builder":
  - Base: eclipse-temurin:21-jdk-alpine
  - WORKDIR /app
  - Copy pom.xml first, run `mvn dependency:go-offline -B` (layer cache)
  - Copy src/, run `mvn clean package -DskipTests -B`
  - The JAR output is at target/campuskey-backend-0.0.1-SNAPSHOT.jar

Stage 2 — "runner":
  - Base: eclipse-temurin:21-jre-alpine
  - Create non-root user: `appuser` (uid 1001)
  - WORKDIR /app
  - Copy JAR from builder as app.jar
  - EXPOSE 8080
  - HEALTHCHECK: curl -f http://localhost:8080/actuator/health || exit 1
    (install curl in alpine first)
  - ENTRYPOINT ["java", "-jar", "app.jar"]
  - Run as appuser

ARG/LABEL metadata:
  - LABEL maintainer="CampusKey Team"
  - LABEL org.opencontainers.image.source="https://github.com/<OWNER>/Campuskey"
  - ARG SPRING_PROFILES_ACTIVE=prod
  - ENV SPRING_PROFILES_ACTIVE=${SPRING_PROFILES_ACTIVE}

=== FILE 2: docker/Dockerfile.frontend ===

Multi-stage build for React 18 / Vite 7 / Node 20:

Stage 1 — "deps":
  - Base: node:20-alpine
  - WORKDIR /app
  - Copy package.json + package-lock.json
  - RUN npm ci --ignore-scripts

Stage 2 — "builder":
  - Base: node:20-alpine
  - WORKDIR /app
  - Copy node_modules from deps
  - Copy all source
  - ARG VITE_API_URL=/api
  - ENV VITE_API_URL=${VITE_API_URL}
  - RUN npm run build

Stage 3 — "runner":
  - Base: nginx:1.27-alpine
  - Remove default nginx config
  - Copy custom nginx.conf (from docker/configs/nginx.conf — we will create this)
  - Copy dist/ from builder to /usr/share/nginx/html
  - EXPOSE 80
  - HEALTHCHECK: curl -f http://localhost/ || exit 1
  - CMD ["nginx", "-g", "daemon off;"]

ALSO generate:
  docker/configs/nginx.conf — minimal nginx config:
  - Listen on port 80
  - Serve /usr/share/nginx/html
  - SPA fallback: try_files $uri $uri/ /index.html
  - Proxy /api/* requests to http://backend:8080/ (strip /api prefix)
  - Gzip on for text/html, application/json, text/css, application/javascript
  - Cache static assets (js, css, images) for 1 year
  - Security headers (X-Frame-Options, X-Content-Type-Options, X-XSS-Protection)

=== FILE 3: backend/campuskey-backend/docker/Dockerfile ===
  - Symlink/copy: identical content to docker/Dockerfile.backend but with
    build context adjusted (COPY paths relative to backend/campuskey-backend/).
    This allows standalone `docker build` from within the backend directory.

=== FILE 4: frontend/campuskey/docker/Dockerfile ===
  - Same approach: identical to docker/Dockerfile.frontend but with
    build context adjusted (COPY paths relative to frontend/campuskey/).
```

### Gate
✅ Run `docker build -f docker/Dockerfile.backend ./backend/campuskey-backend --no-cache --dry-run` and `docker build -f docker/Dockerfile.frontend ./frontend/campuskey --no-cache --dry-run` — both must parse without syntax errors.

---

## STAGE 2 — Docker Compose Service Files

### Prompt

```
You are generating Docker Compose service definitions for CampusKey.
Re-read the CONTEXT LOCK above before proceeding.
Use Compose Specification (no "version:" key).

=== FILE 1: docker/services/database.compose.yml ===
Service: database
  - image: mysql:8.0
  - container_name: campuskey-database
  - restart: unless-stopped
  - ports: "3306:3306"
  - environment from .env: MYSQL_ROOT_PASSWORD, MYSQL_DATABASE, MYSQL_USER, MYSQL_PASSWORD
  - volumes: campuskey-db-data:/var/lib/mysql
  - healthcheck: mysqladmin ping -h localhost
  - networks: [campuskey-net]

=== FILE 2: docker/services/redis.compose.yml ===
Service: redis
  - image: redis:7-alpine
  - container_name: campuskey-redis
  - restart: unless-stopped
  - ports: "6379:6379"
  - command: redis-server /usr/local/etc/redis/redis.conf --requirepass ${REDIS_PASSWORD}
  - volumes:
    - ./configs/redis.conf:/usr/local/etc/redis/redis.conf:ro
    - campuskey-redis-data:/data
  - healthcheck: redis-cli -a ${REDIS_PASSWORD} ping
  - networks: [campuskey-net]

=== FILE 3: docker/services/backend.compose.yml ===
Service: backend
  - build:
      context: ../backend/campuskey-backend
      dockerfile: ../../docker/Dockerfile.backend
      args: SPRING_PROFILES_ACTIVE=${SPRING_PROFILES_ACTIVE:-dev}
  - image: ${BACKEND_IMAGE:-campuskey-backend:latest}
  - container_name: campuskey-backend
  - restart: unless-stopped
  - ports: "8080:8080"
  - environment from .env: SPRING_PROFILES_ACTIVE, SPRING_DATASOURCE_URL,
    SPRING_DATASOURCE_USERNAME, SPRING_DATASOURCE_PASSWORD, JWT_SECRET, JWT_EXPIRATION_MS
  - depends_on:
      database: { condition: service_healthy }
      redis: { condition: service_healthy }
  - healthcheck: curl -f http://localhost:8080/actuator/health || exit 1
  - networks: [campuskey-net]

=== FILE 4: docker/services/frontend.compose.yml ===
Service: frontend
  - build:
      context: ../frontend/campuskey
      dockerfile: ../../docker/Dockerfile.frontend
      args: VITE_API_URL=${VITE_API_URL:-/api}
  - image: ${FRONTEND_IMAGE:-campuskey-frontend:latest}
  - container_name: campuskey-frontend
  - restart: unless-stopped
  - ports: "80:80"
  - depends_on:
      backend: { condition: service_healthy }
  - healthcheck: curl -f http://localhost/ || exit 1
  - networks: [campuskey-net]

Each file must also declare its own volumes and networks sections at bottom.
Use `name:` on networks so all files share `campuskey-net`.
```

### Gate
✅ Each compose file passes `docker compose -f docker/services/<file> config` without errors.

---

## STAGE 3 — Infrastructure Compose Files

### Prompt

```
You are generating Docker Compose infrastructure definitions for CampusKey.
Re-read the CONTEXT LOCK above before proceeding.

=== FILE 1: docker/infrastructure/observability.compose.yml ===
Services:
  prometheus:
    - image: prom/prometheus:latest
    - container_name: campuskey-prometheus
    - ports: "9090:9090"
    - volumes: ./configs/prometheus.yml:/etc/prometheus/prometheus.yml:ro
    - networks: [campuskey-net]
    - restart: unless-stopped

  grafana:
    - image: grafana/grafana:latest
    - container_name: campuskey-grafana
    - ports: "3000:3000"
    - environment: GF_SECURITY_ADMIN_PASSWORD=${GRAFANA_ADMIN_PASSWORD:-admin}
    - volumes: campuskey-grafana-data:/var/lib/grafana
    - depends_on: [prometheus]
    - networks: [campuskey-net]
    - restart: unless-stopped

  loki:
    - image: grafana/loki:latest
    - container_name: campuskey-loki
    - ports: "3100:3100"
    - networks: [campuskey-net]
    - restart: unless-stopped

  promtail:
    - image: grafana/promtail:latest
    - container_name: campuskey-promtail
    - volumes:
      - ./configs/promtail-config.yml:/etc/promtail/config.yml:ro
      - /var/log:/var/log:ro
    - depends_on: [loki]
    - networks: [campuskey-net]
    - restart: unless-stopped

=== FILE 2: docker/infrastructure/ai.compose.yml ===
  Leave as a placeholder with a commented-out service template:
  # Uncomment and configure when AI model serving is ready
  # ai-service:
  #   image: campuskey-ai:latest
  #   ...

Also generate config file content:

=== docker/configs/prometheus.yml ===
  - global scrape_interval: 15s
  - scrape_configs:
    - job_name: campuskey-backend
      metrics_path: /actuator/prometheus
      static_configs:
        - targets: ['backend:8080']

=== docker/configs/promtail-config.yml ===
  - server http_listen_port: 9080
  - positions filename: /tmp/positions.yaml
  - client url: http://loki:3100/loki/api/v1/push
  - scrape_configs for /var/log/*.log

=== docker/configs/redis.conf ===
  - maxmemory 256mb
  - maxmemory-policy allkeys-lru
  - appendonly yes
  - appendfsync everysec
```

### Gate
✅ Config files are valid YAML/conf. Compose files pass `docker compose config`.

---

## STAGE 4 — Root Compose Files (Orchestration Layer)

### Prompt

```
You are generating the top-level Docker Compose orchestration for CampusKey.
Re-read the CONTEXT LOCK above before proceeding.

=== FILE 1: docker/docker-compose.yml (BASE/DEFAULT) ===
  Use Compose `include:` to pull in service and infra files:

  include:
    - path: services/database.compose.yml
    - path: services/redis.compose.yml
    - path: services/backend.compose.yml
    - path: services/frontend.compose.yml

  # Infrastructure (optional, loaded via profiles or override)
  # include:
  #   - path: infrastructure/observability.compose.yml

  Declare shared network:
    networks:
      campuskey-net:
        driver: bridge
        name: campuskey-net

=== FILE 2: docker/docker-compose.dev.yml (DEVELOPMENT OVERRIDES) ===
  Override for local development with HOT-RELOAD:

  services:
    backend:
      build:
        target: builder          # stop at builder stage, run with devtools
      command: >
        mvn spring-boot:run
        -Dspring-boot.run.jvmArguments="-agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=*:5005"
        -Dspring-boot.run.profiles=dev
      volumes:
        - ../backend/campuskey-backend/src:/app/src:cached
        - ../backend/campuskey-backend/pom.xml:/app/pom.xml:ro
        - maven-cache:/root/.m2
      ports:
        - "8080:8080"
        - "5005:5005"     # Java debug port
      environment:
        - SPRING_PROFILES_ACTIVE=dev
        - SPRING_DEVTOOLS_RESTART_ENABLED=true

    frontend:
      build:
        target: deps             # stop at deps stage, run vite dev server
      command: npm run dev -- --host 0.0.0.0
      volumes:
        - ../frontend/campuskey/src:/app/src:cached
        - ../frontend/campuskey/public:/app/public:cached
        - ../frontend/campuskey/index.html:/app/index.html:ro
        - ../frontend/campuskey/vite.config.js:/app/vite.config.js:ro
        - ../frontend/campuskey/tailwind.config.js:/app/tailwind.config.js:ro
        - ../frontend/campuskey/postcss.config.js:/app/postcss.config.js:ro
      ports:
        - "5173:5173"
      environment:
        - VITE_API_URL=http://localhost:8080

    database:
      ports:
        - "3306:3306"      # expose for local DB tools

  volumes:
    maven-cache:


```

### Gate
✅ Both commands must pass:
- `docker compose -f docker/docker-compose.yml -f docker/docker-compose.dev.yml config`
- `docker compose -f docker/docker-compose.yml -f docker/docker-compose.prod.yml config`

---

## STAGE 5 — Makefile (Developer DX)

### Prompt

```
You are generating a Makefile for CampusKey developer workflow.
Re-read the CONTEXT LOCK above before proceeding.

Generate `Makefile` at project root with these targets:

.PHONY declarations for all targets.
COMPOSE_DEV = docker compose -f docker/docker-compose.yml -f docker/docker-compose.dev.yml
COMPOSE_PROD = docker compose -f docker/docker-compose.yml -f docker/docker-compose.prod.yml

## ─── Development ───────────────────────────────────────────
dev:              $(COMPOSE_DEV) up --build
dev-detach:       $(COMPOSE_DEV) up --build -d
dev-down:         $(COMPOSE_DEV) down
dev-logs:         $(COMPOSE_DEV) logs -f
dev-restart:      $(COMPOSE_DEV) restart $(service)

## ─── Build ─────────────────────────────────────────────────
build-backend:    docker build -f docker/Dockerfile.backend -t campuskey-backend:latest ./backend/campuskey-backend
build-frontend:   docker build -f docker/Dockerfile.frontend -t campuskey-frontend:latest ./frontend/campuskey
build-all:        build-backend build-frontend

## ─── Testing ───────────────────────────────────────────────
test-backend:     $(COMPOSE_DEV) exec backend mvn test
test-frontend:    $(COMPOSE_DEV) exec frontend npm test
test-all:         test-backend test-frontend

## ─── Cleanup ───────────────────────────────────────────────
clean:            $(COMPOSE_DEV) down -v --rmi local --remove-orphans
prune:            docker system prune -af --volumes

## ─── Utility ───────────────────────────────────────────────
shell-backend:    $(COMPOSE_DEV) exec backend /bin/sh
shell-frontend:   $(COMPOSE_DEV) exec frontend /bin/sh
shell-db:         $(COMPOSE_DEV) exec database mysql -u root -p
status:           $(COMPOSE_DEV) ps
env-copy:         cp .env.example .env
```

### Gate
✅ `make --dry-run dev` parses without errors.

---

## STAGE 6 — GitHub Actions CI/CD Pipeline

### Prompt

```
You are generating GitHub Actions workflows for CampusKey.
Re-read the CONTEXT LOCK above before proceeding.

=== FILE 1: .github/workflows/ci-cd-pipeline.yml ===

name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

env:
  REGISTRY: ghcr.io
  BACKEND_IMAGE: ghcr.io/${{ github.repository_owner }}/campuskey-backend
  FRONTEND_IMAGE: ghcr.io/${{ github.repository_owner }}/campuskey-frontend

concurrency:
  group: ${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: true

jobs:

  # ──────────────────────── CHANGES DETECTION ────────────────────────
  changes:
    name: Detect Changes
    runs-on: ubuntu-latest
    outputs:
      backend: ${{ steps.filter.outputs.backend }}
      frontend: ${{ steps.filter.outputs.frontend }}
      docker: ${{ steps.filter.outputs.docker }}
    steps:
      - uses: actions/checkout@v4
      - uses: dorny/paths-filter@v3
        id: filter
        with:
          filters: |
            backend:
              - 'backend/**'
              - 'docker/Dockerfile.backend'
            frontend:
              - 'frontend/**'
              - 'docker/Dockerfile.frontend'
            docker:
              - 'docker/**'

  # ──────────────────────── BACKEND TEST ─────────────────────────────
  test-backend:
    name: Backend Tests
    needs: changes
    if: needs.changes.outputs.backend == 'true' || needs.changes.outputs.docker == 'true'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-java@v4
        with:
          distribution: temurin
          java-version: 21
          cache: maven
      - name: Run Maven Tests
        working-directory: backend/campuskey-backend
        run: mvn clean verify -B
      - name: Upload Test Reports
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: backend-test-reports
          path: backend/campuskey-backend/target/surefire-reports/

  # ──────────────────────── FRONTEND TEST ────────────────────────────
  test-frontend:
    name: Frontend Tests
    needs: changes
    if: needs.changes.outputs.frontend == 'true' || needs.changes.outputs.docker == 'true'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version-file: frontend/campuskey/.nvmrc
          cache: npm
          cache-dependency-path: frontend/campuskey/package-lock.json
      - name: Install Dependencies
        working-directory: frontend/campuskey
        run: npm ci
      - name: Lint
        working-directory: frontend/campuskey
        run: npx eslint src/ --max-warnings 0 || true
      - name: Build Check
        working-directory: frontend/campuskey
        run: npm run build

  # ──────────────────────── BUILD & PUSH IMAGES ──────────────────────
  build-backend-image:
    name: Build Backend Image
    needs: [test-backend]
    if: github.event_name == 'push'    # only build images on merge, not on PR
    runs-on: ubuntu-latest
    permissions:
      contents: read
      packages: write
    steps:
      - uses: actions/checkout@v4
      - uses: docker/setup-buildx-action@v3
      - uses: docker/login-action@v3
        with:
          registry: ${{ env.REGISTRY }}
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}
      - uses: docker/metadata-action@v5
        id: meta
        with:
          images: ${{ env.BACKEND_IMAGE }}
          tags: |
            type=sha
            type=ref,event=branch
            type=raw,value=latest,enable=${{ github.ref == 'refs/heads/main' }}
      - uses: docker/build-push-action@v6
        with:
          context: ./backend/campuskey-backend
          file: docker/Dockerfile.backend
          push: true
          tags: ${{ steps.meta.outputs.tags }}
          labels: ${{ steps.meta.outputs.labels }}
          cache-from: type=gha
          cache-to: type=gha,mode=max
          build-args: SPRING_PROFILES_ACTIVE=prod

  build-frontend-image:
    name: Build Frontend Image
    needs: [test-frontend]
    if: github.event_name == 'push'
    runs-on: ubuntu-latest
    permissions:
      contents: read
      packages: write
    steps:
      - uses: actions/checkout@v4
      - uses: docker/setup-buildx-action@v3
      - uses: docker/login-action@v3
        with:
          registry: ${{ env.REGISTRY }}
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}
      - uses: docker/metadata-action@v5
        id: meta
        with:
          images: ${{ env.FRONTEND_IMAGE }}
          tags: |
            type=sha
            type=ref,event=branch
            type=raw,value=latest,enable=${{ github.ref == 'refs/heads/main' }}
      - uses: docker/build-push-action@v6
        with:
          context: ./frontend/campuskey
          file: docker/Dockerfile.frontend
          push: true
          tags: ${{ steps.meta.outputs.tags }}
          labels: ${{ steps.meta.outputs.labels }}
          cache-from: type=gha
          cache-to: type=gha,mode=max
          build-args: VITE_API_URL=/api

=== FILE 2: .github/workflows/codeql-analysis.yml ===

name: CodeQL Security Analysis

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]
  schedule:
    - cron: '0 6 * * 1'    # Weekly Monday 6am UTC

jobs:
  analyze:
    name: Analyze
    runs-on: ubuntu-latest
    permissions:
      actions: read
      contents: read
      security-events: write
    strategy:
      matrix:
        language: [java, javascript]
    steps:
      - uses: actions/checkout@v4
      - uses: github/codeql-action/init@v3
        with:
          languages: ${{ matrix.language }}
      - if: matrix.language == 'java'
        uses: actions/setup-java@v4
        with:
          distribution: temurin
          java-version: 21
          cache: maven
      - if: matrix.language == 'java'
        working-directory: backend/campuskey-backend
        run: mvn compile -B -DskipTests
      - uses: github/codeql-action/analyze@v3
```

### Gate
✅ Paste each workflow YAML into [YAML Lint](https://yamllint.com) — must be valid.
✅ CI pipeline has: changes detection → test → build → push flow.
✅ Images are only pushed on `push` (not on `pull_request`).
✅ Tests run on BOTH `push` and `pull_request`.

---
## STAGE 7 — Autonomous Issue Creation & QA Feedback Loop

Generate GitHub Actions job that:

1. Detects ANY pipeline failure
2. Creates a GitHub Issue with:
    - Workflow name
    - Branch
    - Commit SHA
    - Logs link
3. Labels issue as:
    - ci
    - bug
    - auto-generated

Also generate optional workflow:
- Trigger: issues opened
- If issue contains "CI Failure"
- Create fix branch
- Commit placeholder fix
- Open PR

Gate:
✅ Issue is created when pipeline fails
✅ Issue contains logs link
✅ Labels are correctly assigned

## STAGE 8 — Final Validation & Documentation

### Prompt

```
You are performing final validation of the CampusKey DevOps pipeline.
Re-read the CONTEXT LOCK above before proceeding.

CHECKLIST — confirm each item is true. If ANY item fails, fix it before continuing:

[ ] .dockerignore excludes .git, node_modules, target, build, .env*
[ ] .env.example has ALL variables referenced in compose files
[ ] Dockerfile.backend builds a Spring Boot JAR with Java 21
[ ] Dockerfile.frontend builds React app and serves via nginx
[ ] nginx.conf has SPA fallback AND /api proxy to backend:8080
[ ] docker-compose.yml includes all 4 service compose files
[ ] docker-compose.dev.yml mounts source code for hot-reload
[ ] docker-compose.dev.yml exposes debug port 5005 for Java
[ ] All services use healthcheck and restart: unless-stopped
[ ] All services share campuskey-net network
[ ] Makefile has dev, build, test, clean, shell targets
[ ] CI pipeline detects path changes and skips unchanged services
[ ] CI pipeline runs tests on push AND pull_request
[ ] CI pipeline builds+pushes images ONLY on push to main/develop
[ ] CI pipeline uses GitHub Container Registry (ghcr.io)
[ ] CI pipeline has concurrency control to cancel stale runs
[ ] CodeQL scans both Java and JavaScript

After validation, update the project README.md to add a "Docker Development"
section with commands:
  - `cp .env.example .env` and fill in values
  - `make dev` — start dev environment with hot-reload
  - `make dev-detach` — start in background
  - `make dev-logs` — follow logs
  - `make test-all` — run all tests
  - `make build-all` — build production images
  - `make clean` — teardown and cleanup
```

### Gate
✅ All checklist items confirmed.
✅ README.md updated with Docker instructions.

---

## AUTONOMOUS EXECUTION MODE

After each successful stage gate:
- Automatically proceed to the next stage
- Only pause if:
  - A gate condition fails
  - Ambiguity is detected (e.g., missing context variable)

Maintain a **generation log** at the end of each stage:
```
Stage X complete:
  Files generated: [list]
  Errors fixed: [count]
  Retries: [count]
```

## CONTEXT DEVIATION PROTOCOL

Before each stage:
1. Re-read the CONTEXT LOCK
2. Verify all file paths match the declared structure
3. If deviation detected → **STOP** → correct before continuing
4. NEVER rename files or create files not listed in context
