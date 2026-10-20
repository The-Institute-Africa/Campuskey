# CampusKey

CampusKey connects university students with accommodation listings and landlords in Zimbabwe.

## Stack and layout

- **Frontend:** React 18, Vite, Tailwind CSS, Radix UI
- **Backend:** Java 21, Spring Boot 3.5, Spring Data JPA, Spring Security, JWT
- **Database:** MySQL for the application; H2 for automated tests

```text
backend/campuskey-backend/   Spring Boot application and Gradle build
frontend/campuskey/          React/Vite application
```

## Workflows

Students can browse approved listings, save favorites, send booking requests and inquiries, review request statuses and landlord replies, and reset or change passwords. Landlords can submit verification information, manage property listings, respond to bookings, and reply to inquiries.

CampusKey does not process rent or deposit payments. A booking request is a request for landlord review, not a lease or payment.

## Local setup

### Backend

Install JDK 21 and run MySQL. Set the required environment variables, then start the API:

```bash
cd backend/campuskey-backend
./gradlew bootRun
```

The API listens on `http://localhost:8080`.

### Frontend

Install Node.js and npm. Set `VITE_API_URL` to the backend origin (for example, `http://localhost:8080`), then run:

```bash
cd frontend/campuskey
npm ci
npm run dev
```

Create a production bundle with `npm run build`.

## Backend environment

| Variable | Purpose |
| --- | --- |
| `CAMPUSKEY_DB_URL` | JDBC URL for MySQL |
| `CAMPUSKEY_DB_USERNAME` | MySQL username |
| `CAMPUSKEY_DB_PASSWORD` | MySQL password |
| `CAMPUSKEY_JWT_SECRET` | Base64-encoded JWT key of at least 256 bits |
| `CAMPUSKEY_MAIL_USERNAME` | SMTP account |
| `CAMPUSKEY_MAIL_PASSWORD` | SMTP password or app password |
| `CAMPUSKEY_MAIL_HOST` | SMTP host; defaults to Gmail |
| `CAMPUSKEY_MAIL_PORT` | SMTP port; defaults to 587 |
| `CAMPUSKEY_FRONTEND_URL` | Allowed frontend origin; defaults to `http://localhost:5173` |
| `CAMPUSKEY_JPA_DDL_AUTO` | Hibernate schema mode; defaults to `update` for development |
| `CAMPUSKEY_SQL_LOGGING` | SQL logging; defaults to `false` |
| `CAMPUSKEY_SECURITY_LOG_LEVEL` | Spring Security logging level; defaults to `INFO` |
| `CAMPUSKEY_ERROR_INCLUDE_MESSAGE` | Error response detail; defaults to `never` |
| `CAMPUSKEY_UPLOADS_DIRECTORY` | Absolute persistent directory for private verification documents (required with `prod`) |

For production, activate the `prod` Spring profile. It validates rather than changes the schema, uses Flyway migrations, requires an explicit frontend origin and private uploads directory, limits verification documents to 10 MB (overall multipart requests to 30 MB), and honors reverse-proxy forwarding headers. Back up the database before the first Flyway run. The initial Flyway baseline assumes the legacy CampusKey tables already exist; the included V2 migration creates booking, inquiry, and favorite tables. A fresh database still needs a reviewed V1 schema baseline before deployment. Credentials previously committed in repository history must be rotated; removing their current configuration does not revoke them.

The browser-runtime dependency audit (`npm audit --omit=dev`) is clean. The full audit still reports findings in Tailwind 3's build-time dependency tree; resolving them requires a Tailwind 4 migration and visual regression testing, so the full build toolchain is not yet audit-clean.

## Railway deployment

The repository contains separate Dockerfiles for Railway's isolated monorepo services. Create one service rooted at `/backend/campuskey-backend` and another rooted at `/frontend/campuskey`; Railway will detect each Dockerfile. The frontend image requires `VITE_API_URL` at build time.

1. Provision a Railway MySQL service. Import the existing CampusKey database and verify the imported tables/data before deploying the API. Take a restorable backup first and enable Railway database backups/PITR.
2. On the backend service, mount a persistent Railway volume at `/data` and set `SPRING_PROFILES_ACTIVE=prod`, `CAMPUSKEY_UPLOADS_DIRECTORY=/data/uploads`, database credentials/URL, `CAMPUSKEY_JWT_SECRET`, SMTP credentials, and `CAMPUSKEY_FRONTEND_URL`. Build the JDBC URL from the MySQL service's `MYSQLHOST`, `MYSQLPORT`, and `MYSQLDATABASE` references. Generate a new base64 JWT key of at least 32 random bytes (for example, `openssl rand -base64 48`) and store it only as a Railway secret. Set the backend health-check path to `/actuator/health`.
3. Create/assign Railway domains for both services. Set frontend `VITE_API_URL` to `https://<backend-domain>` and backend `CAMPUSKEY_FRONTEND_URL` to the exact `https://<frontend-domain>` origin. Redeploy the frontend after changing its build-time URL.
4. Confirm the imported database is backed up, then deploy the backend. Its Flyway configuration baselines the existing schema at version 1 and runs V2 for workflow tables; Hibernate runs in `validate` mode and will fail startup on a mismatch rather than modifying tables. Confirm health is green before deploying the frontend.
5. Run production smoke tests for signup/login, approved listing search, favorites, booking/inquiry submission and landlord responses, password reset email, admin verification/document preview, and restart persistence of uploaded files. Test a database restore before public launch.

The API container runs as an unprivileged user after preparing the mounted upload directory. Copy the existing `uploads/` tree (listing media and verification documents) into the Railway volume at `/data/uploads` before switching traffic, preserving relative paths; the entrypoint needs permission to recursively `chown` that directory at container start. If the Railway volume cannot be prepared that way, correct its ownership before launch rather than running the application as root. Before uploading real identity documents, confirm Railway volume and backup encryption at rest, access controls, and retention; CampusKey does not currently application-encrypt files. Railway volumes are single-replica storage and introduce a short deployment interruption. Configure continuous monitoring separately: Railway's health check gates deployments but is not ongoing monitoring.

## Contact and license

Developed by [The Institute](https://theinstutite.co.zw). Licensed under the MIT License; see [LICENSE](LICENSE).
