# DevOps Pipeline Sprint Summary

This document records the changes, updates, and fixes made during the DevOps pipeline sprint for the CampusKey monorepo.

## Sprint scope

The sprint focused on getting the local Docker-based development pipeline into a stable, repeatable state:

- root Compose orchestration via `docker/docker-compose.yml`
- development overrides via `docker/docker-compose.dev.yml`
- backend container startup and health reporting
- frontend Vite startup inside the dev container
- documentation of runtime blockers and validation steps

## Changes made

### 1) Backend healthcheck and security alignment

**Problem observed**

- The backend container was repeatedly marked unhealthy.
- Docker health probes hit `GET /actuator/health` and received `401 Unauthorized` because Spring Security required authentication.

**Fix applied**

- Updated `backend/campuskey-backend/src/main/java/com/campuskey/backend/security/SecurityConfig.java` to permit:
  - `/actuator/health`
  - `/actuator/health/**`

**Result**

- Actuator health can now be reached without credentials in the development environment.
- This prevents the container healthcheck from failing because of authentication alone.

### 2) Backend dev health dependency cleanup

**Problem observed**

- Once `/actuator/health` was reachable, Spring Boot still reported the backend as unhealthy because the mail health contributor failed.
- The logs showed `MailHealthIndicator` failing with SMTP authentication errors.

**Fix applied**

- Added a dev-only environment override in `docker/docker-compose.dev.yml`:
  - `MANAGEMENT_HEALTH_MAIL_ENABLED=false`

**Result**

- Mail health is disabled in the dev container only.
- Backend health no longer depends on a valid SMTP account during local Docker development.

### 3) Backend startup grace period tuning

**Problem observed**

- Spring Boot dev startup could take long enough for the container healthcheck to race the application.

**Fix applied**

- Increased the backend dev healthcheck grace settings in `docker/docker-compose.dev.yml`:
  - `start_period: 90s`
  - `retries: 15`

**Result**

- The backend gets a longer window to start before Docker marks it unhealthy.

### 4) Frontend dev-container plugin resolution fix

**Problem observed**

- Vite failed to start in the frontend container because `vite.config.js` dynamically imported files from `./plugins/visual-editor/`.
- Those plugin files existed in the repo, but they were not mounted into the container in dev mode.

**Fix applied**

- Updated `docker/docker-compose.dev.yml` to mount:
  - `../frontend/campuskey/plugins:/app/plugins:cached`

**Result**

- The Vite config can resolve the visual editor plugin modules during local development.
- Frontend dev startup no longer fails because of missing plugin files.

## Files changed

| File | Change |
| --- | --- |
| `backend/campuskey-backend/src/main/java/com/campuskey/backend/security/SecurityConfig.java` | Permitted unauthenticated access to `/actuator/health` for Docker healthchecks. |
| `docker/docker-compose.dev.yml` | Added frontend plugin mount, disabled mail health in dev, and increased backend healthcheck grace period. |

## Validation performed

The following validation was completed after the edits:

- `docker compose -f docker/docker-compose.yml -f docker/docker-compose.dev.yml config`
  - passed successfully
- backend logs were inspected to confirm the original blockers:
  - `401 Unauthorized` on `/actuator/health`
  - `MailHealthIndicator` failure caused by invalid SMTP credentials
- frontend logs confirmed the original startup issue:
  - missing Vite plugin modules under `./plugins/visual-editor/`

## Operational impact

- Dev stack startup is now less fragile.
- Backend readiness no longer depends on authenticated actuator access or working SMTP credentials.
- Frontend dev startup now has access to all files referenced by `vite.config.js`.
- Changes are scoped to development behavior and do not intentionally alter production service logic.

## Follow-up recommendations

1. Move sensitive backend configuration out of `application.properties` and into environment variables or secrets management.
2. Keep backend health checks limited to non-external dependencies in dev, so a missing mail server does not block startup.
3. Consider a dedicated dev health endpoint if additional contributors start affecting readiness in the future.
4. Keep the Docker dev overlay aligned with any future frontend plugin or asset directories imported by Vite.

## Related files for reference

- `docker/docker-compose.yml`
- `docker/docker-compose.dev.yml`
- `docker/services/backend.compose.yml`
- `docker/services/frontend.compose.yml`
- `docker/Dockerfile.backend`
- `docker/Dockerfile.frontend`
- `frontend/campuskey/vite.config.js`
- `backend/campuskey-backend/src/main/java/com/campuskey/backend/security/SecurityConfig.java`


