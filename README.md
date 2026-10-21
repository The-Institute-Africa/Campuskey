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
| `CAMPUSKEY_DOCUMENT_ENCRYPTION_KEY` | Base64-encoded 32-byte AES-256 key for verification documents; required in every profile |

For production, activate the `prod` Spring profile. It validates rather than changes the schema, uses Flyway migrations, requires an explicit frontend origin and private uploads directory, limits verification documents to 10 MB (overall multipart requests to 30 MB), and honors reverse-proxy forwarding headers. The initial Flyway baseline assumes the legacy CampusKey tables already exist; the included V2 migration creates booking, inquiry, and favorite tables. A fresh database still needs a reviewed V1 schema baseline before deployment. There is no live production database yet, so the first data migration should be rehearsed against a non-production database before accepting real users. Credentials previously committed in repository history must be rotated; removing their current configuration does not revoke them.

Verification documents are encrypted by the backend with AES-256-GCM using a fresh random nonce and authentication tag per file. On startup, the backend also encrypts existing plaintext documents in the `verification/`, `landlord/verification/`, and `property/verification/` upload directories in place; an encryption or file-permission error fails startup rather than silently leaving a partial migration. Generate a key with `openssl rand -base64 32`, store it as `CAMPUSKEY_DOCUMENT_ENCRYPTION_KEY`, and keep the same key across deployments. Losing or replacing the key makes existing documents unreadable. This application-level encryption protects verification files at rest; it does not encrypt listing photos/videos or database fields.

### Demo data

To preview realistic but fictional listings and exercise student/landlord workflows, start the backend with the `demo` profile and explicitly enable the seeder. It uses a disposable in-memory H2 database, so demo data disappears when the backend stops and no MySQL database is modified. Set local-only JWT/document keys and demo passwords:

```bash
export SPRING_PROFILES_ACTIVE=demo
export CAMPUSKEY_DEMO_DATA_ENABLED=true
export CAMPUSKEY_DEMO_STUDENT_PASSWORD='choose-a-local-test-password'
export CAMPUSKEY_DEMO_LANDLORD_PASSWORD='choose-another-local-test-password'
export CAMPUSKEY_JWT_SECRET="$(openssl rand -base64 48)"
export CAMPUSKEY_DOCUMENT_ENCRYPTION_KEY="$(openssl rand -base64 32)"
```

Start the backend from `backend/campuskey-backend`:

```bash
./gradlew bootRun
```

The seeder creates three approved fictional Harare listings, a student and landlord login, and sample booking, inquiry, and favorite records. Browse listings at `http://localhost:5173/properties` after starting the frontend with `VITE_API_URL=http://localhost:8080 npm run dev` from `frontend/campuskey`; sign in as `demo_student` or `demo_landlord` using the passwords you set above to view sample dashboards. Seeding is idempotent and only runs when the non-production `demo` profile and explicit enable flag are both active. The demo profile cannot seed when `prod` is active.

The browser-runtime dependency audit (`npm audit --omit=dev`) is clean. The full audit still reports findings in Tailwind 3's build-time dependency tree; resolving them requires a Tailwind 4 migration and visual regression testing, so the full build toolchain is not yet audit-clean.

## Railway deployment

The repository contains separate Dockerfiles for Railway's isolated monorepo services. Create one service rooted at `/backend/campuskey-backend` and another rooted at `/frontend/campuskey`; Railway will detect each Dockerfile. The frontend image requires `VITE_API_URL` at build time.

1. Provision a Railway MySQL service for the first migration rehearsal. No live production database exists yet; validate the schema migration against a disposable/non-production database and only import the dataset selected for testing.
2. On the backend service, mount a persistent Railway volume at `/data` and set `SPRING_PROFILES_ACTIVE=prod`, `CAMPUSKEY_UPLOADS_DIRECTORY=/data/uploads`, database credentials/URL, `CAMPUSKEY_JWT_SECRET`, `CAMPUSKEY_DOCUMENT_ENCRYPTION_KEY`, SMTP credentials, and `CAMPUSKEY_FRONTEND_URL`. Build the JDBC URL from the MySQL service's `MYSQLHOST`, `MYSQLPORT`, and `MYSQLDATABASE` references. Generate independent base64 keys (`openssl rand -base64 48` for JWT; `openssl rand -base64 32` for document encryption) and store them only as Railway secrets. Preserve the document-encryption key across redeploys; changing it requires re-encrypting all stored documents. Set the backend health-check path to `/actuator/health`.
3. Create/assign Railway domains for both services. Set frontend `VITE_API_URL` to `https://<backend-domain>` and backend `CAMPUSKEY_FRONTEND_URL` to the exact `https://<frontend-domain>` origin. Redeploy the frontend after changing its build-time URL.
4. Deploy the backend to the migration-rehearsal database. Its Flyway configuration baselines an existing legacy schema at version 1 and runs V2 for workflow tables; Hibernate runs in `validate` mode and will fail startup on a mismatch rather than modifying tables. A fresh schema still requires a reviewed V1 migration. Confirm health is green before deploying the frontend.
5. Run production smoke tests for signup/login, approved listing search, favorites, booking/inquiry submission and landlord responses, password reset email, admin verification/document preview, and restart persistence of uploaded files. Test a database restore before public launch.

The API container runs as an unprivileged user after preparing the mounted upload directory. Copy the source `uploads/` tree (listing media and verification documents) into the Railway volume at `/data/uploads` before switching traffic, preserving relative paths; the entrypoint needs permission to recursively `chown` that directory at container start. If the Railway volume cannot be prepared that way, correct its ownership before launch rather than running the application as root. The application encrypts verification documents at rest; listing media remains unencrypted and public by design. Railway volumes are single-replica storage and introduce a short deployment interruption. Configure continuous monitoring separately: Railway's health check gates deployments but is not ongoing monitoring.

## Contact and license

Developed by [The Institute](https://theinstutite.co.zw). Licensed under the MIT License; see [LICENSE](LICENSE).
