## Plan: Controlled Spring Backend Pipeline

Draft plan: stabilize the current backend skeleton first, then execute deterministic 6-file generation batches with compile gates after every batch. This reduces drift, enforces your layering/security/AI governance rules, and keeps each stage self-healing. Based on current code, the highest-risk blocker is package/model inconsistency between `security` classes and mostly empty module files, so Stage 0 should resolve the canonical domain structure before any feature generation.

### Steps
1. Inventory baseline and classify blockers in [SecurityConfig.java](backend/campuskey-backend/src/main/java/com/campuskey/backend/security/SecurityConfig.java), [UserDetailsImpl.java](backend/campuskey-backend/src/main/java/com/campuskey/backend/security/services/UserDetailsImpl.java), and [CampusKeyApplication.java](backend/campuskey-backend/src/main/java/com/campuskey/backend/CampusKeyApplication.java).
2. Define canonical package map and entity relationships across [modules](backend/campuskey-backend/src/main/java/com/campuskey/backend/modules), then lock naming for `Controller`, `Service`, `Repository`, `Mapper`, `Dto`.
3. Execute Stage 0 bootstrap batch to make app minimally compilable using [build.gradle](backend/campuskey-backend/build.gradle), [pom.xml](backend/campuskey-backend/pom.xml), and `GlobalExceptionHandler`.
4. Run iterative generation batches (max 6 files) per module with mandatory `Pageable`, enum statuses, explicit mapper layer, and `@Slf4j` service logging.
5. After each batch, apply strict validation + fix-only loop, then pause for next stage approval before continuing.

### Further Considerations
1. Package conflict resolution first: Option A keep `modules.*`; Option B revive `entities/repositories`; Option C hybrid with adapter layer.
2. Initial functional slice for first batches: Option A auth/core security; Option B users + ownership checks; Option C AI orchestration path.
3. Confirm this draft and choose Option A/B/C for both decisions so I can refine Stage 1 precisely.

### HARD ENFORCEMENT RULES:
1. SINGLE SOURCE OF TRUTH:
    - Each core entity (User, Role, Property) MUST exist in exactly one location.
    - Any duplicate must NOT be annotated with @Entity.

2. MAPPER LAYER MANDATORY:
    - Every entity MUST have a Mapper class.
    - Controllers MUST NOT perform mapping.
    - Services MUST use Mapper classes exclusively.

3. TRANSACTION MANAGEMENT:
    - All write methods MUST use @Transactional
    - Read methods MUST use @Transactional(readOnly = true)

4. CONCURRENCY CONTROL:
    - All entities MUST include @Version field for optimistic locking

5. IDEMPOTENCY:
    - Duplicate operations MUST be prevented using:
        - unique constraints
        - exists checks

6. ERROR STANDARDIZATION:
    - All errors MUST include:
        - message
        - code
        - timestamp
        - path

7. AI RESILIENCE:
    - AI calls MUST include:
        - timeout handling
        - fallback response
        - circuit breaker pattern (stub acceptable)

8. FILE SECURITY:
    - Normalize file paths
    - Reject suspicious filenames
    - Enforce max upload count per request

9. ANTI-HALLUCINATION:
    - Do NOT generate classes unless explicitly listed
    - Do NOT assume missing dependencies

10. LOGGING STANDARD:
- Use structured logging:
  log.info("Creating property: {}", propertyId);

### AUTONOMOUS EXECUTION MODE:
- After each successful compilation:
    - Automatically proceed to next batch
- Only pause if:
    - compilation fails
    - ambiguity detected

- Maintain a generation log:
    - files generated
    - errors fixed
    - retries count

### CONTEXT LOCK:
Before each generation:
- Re-state:
    - package structure
    - entity definitions
    - naming conventions

- If deviation detected:
    - STOP
    - correct before continuing