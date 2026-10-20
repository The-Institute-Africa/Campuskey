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
| `CAMPUSKEY_FRONTEND_URL` | Allowed frontend origin; defaults to `http://localhost:5173` |
| `CAMPUSKEY_JPA_DDL_AUTO` | Hibernate schema mode; defaults to `update` for development |
| `CAMPUSKEY_SQL_LOGGING` | SQL logging; defaults to `false` |
| `CAMPUSKEY_SECURITY_LOG_LEVEL` | Spring Security logging level; defaults to `INFO` |
| `CAMPUSKEY_ERROR_INCLUDE_MESSAGE` | Error response detail; defaults to `never` |

The project does not yet contain a reviewed baseline/versioned migration set or a selected hosting configuration. Do not deploy with Hibernate `update`; establish and test the production migration plan before switching to schema validation. Credentials previously committed in repository history must be rotated; removing their current configuration does not revoke them.

## Contact and license

Developed by [The Institute](https://theinstutite.co.zw). Licensed under the MIT License; see [LICENSE](LICENSE).
