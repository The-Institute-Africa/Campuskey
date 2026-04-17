# Branch Change Report: `feat/new-campuskey-backbone`

This document captures the committed changes currently on the branch compared with `main`. It is based on `main..HEAD` and intentionally excludes the local uncommitted IDE change visible in the working tree (`.idea/workspace.xml`).

## 1) Context summary
- Branch: `feat/new-campuskey-backbone`
- Merge base with `main`: `c828e632aabf2f35d57f6439012eaf8f62d4f672`
- HEAD: `5e86a41355ad16f42f90f89d3da6b0215263aa4b` (`5e86a41`)
- Comparison scope: `main..HEAD`
- Totals: 436 files changed, 12538 insertions(+), 5447 deletions(-)
- Changed files: `436`
- Commit count: `3`

## 2) Commit timeline

| Hash | Date | Commit message |
| --- | --- | --- |
| `8b8e8fe` | 2026-04-10 | refactor(backend): transition to modular architecture foundations |
| `3571fc5` | 2026-04-10 | feat(backend): finalize modular migration and domain scaffolds |
| `5e86a41` | 2026-04-10 | chore(repo): add platform assets, docs, frontend ai surfaces and workspace updates |

### Commit-by-commit interpretation

- `8b8e8fe` — established the modular backend architecture foundations, including the initial domain/module partitioning and supporting infrastructure.
- `3571fc5` — completed the modular migration and added the domain scaffolds that the backend modules build on.
- `5e86a41` — broadened the repository with platform assets, docs, frontend AI surfaces, workflow updates, and workspace adjustments.

## 3) Branch-wide area summary

| Area | File count | What changed |
| --- | ---: | --- |
| `backend` | 372 | Core backend work: modular Java packages, generated build outputs, backend Docker assets, and backend project metadata. |
| `frontend` | 20 | Frontend surfaces and integration-facing assets that accompany the backend work. |
| `docker` | 15 | Root orchestration and service composition updates. |
| `docs` | 7 | Documentation updates and supporting design notes. |
| `ai-models` | 7 | AI prompt/evaluation assets and related documentation. |
| `.idea` | 4 | IDE metadata created during the branch. |
| `.github` | 3 | CI/CD and quality workflows. |
| root files | 8 | Repository-level config and planning files (`.env.example`, `.gitignore`, `Makefile`, etc.). |

### Backend detail

- Backend source footprint: `263` files under `backend/campuskey-backend/src`.
- Backend generated/build footprint: `104` files under `backend/campuskey-backend/target` plus build artifacts if present.
- Backend domain modules touched: users, properties, auth, ai, reviews, emails, notifications, bookings.
- Domain module counts: users `30`, properties `30`, auth `28`, ai `23`, reviews `9`, emails `6`, notifications `6`, bookings `6`.
- Users module package mix: dto `7`, repository `6`, services `6`, entity `6`, controller `4`, mapper `1`.
- Main Java package mix: modules `138`, entities `18`, infrastructure `17`, services `17`, repositories `15`, dto `14`, controllers `14`, exceptions `5`, security `3`, specification `1`, utils `1`, requests `1`.
- Java entry points: `CampusKeyApplication.java` and `CampuskeyBackendApplication.java` are both present in the changed source set.

### What the backend changes collectively cover

- Modularization of the backend package tree around domain ownership and layered separation.
- Explicit DTO, entity, repository, service, controller, and mapper layers under the new module structure.
- Domain expansion for user-centric and property-centric workflows, with supporting auth and AI orchestration pieces.
- Additional operational support: Docker definitions, CI workflows, logging/config files, and generated backend artifacts.
- A broad set of generated `target` artifacts is included in the branch history; these are documented here because they were part of the pushed changes, but they should typically remain out of future source-only commits.

## 4) Notable module-level observations

- `users` now has the clearest layered split, with dedicated `controller`, `dto`, `entity`, `mapper`, `repository`, and `services` package families.
- `properties` is the next major domain area and appears to carry the bulk of the property lifecycle and supporting metadata changes.
- `auth` and `ai` are substantial, reflecting security/authentication work and the AI governance/orchestration surface.
- `reviews`, `emails`, `notifications`, and `bookings` are smaller but complete domain slices, indicating the backend now has broader cross-cutting support beyond the core user/property flows.

## 5) Full changed-file inventory

The following inventory lists every changed file in the branch comparison. The paths are grouped by top-level directory and retain the git status code (`M`, `A`, `D`, etc.) for traceability.

<details>
<summary>backend (372 files)</summary>

- `A` `backend/campuskey-backend/docker/.dockerignore`
- `A` `backend/campuskey-backend/docker/docker-compose.yml`
- `A` `backend/campuskey-backend/docker/Dockerfile`
- `A` `backend/campuskey-backend/generation-log.md`
- `A` `backend/campuskey-backend/pom.xml`
- `A` `backend/campuskey-backend/src/main/java/com/campuskey/backend/CampusKeyApplication.java`
- `D` `backend/campuskey-backend/src/main/java/com/campuskey/backend/CampuskeyBackendApplication.java`
- `D` `backend/campuskey-backend/src/main/java/com/campuskey/backend/controllers/AdminController.java`
- `D` `backend/campuskey-backend/src/main/java/com/campuskey/backend/controllers/AmenityController.java`
- `D` `backend/campuskey-backend/src/main/java/com/campuskey/backend/controllers/AuthController.java`
- `D` `backend/campuskey-backend/src/main/java/com/campuskey/backend/controllers/CsrfController.java`
- `D` `backend/campuskey-backend/src/main/java/com/campuskey/backend/controllers/DashboardController.java`
- `D` `backend/campuskey-backend/src/main/java/com/campuskey/backend/controllers/LandlordController.java`
- `D` `backend/campuskey-backend/src/main/java/com/campuskey/backend/controllers/LandlordVerificationController.java`
- `D` `backend/campuskey-backend/src/main/java/com/campuskey/backend/controllers/PropertyController.java`
- `D` `backend/campuskey-backend/src/main/java/com/campuskey/backend/controllers/PropertyImageController.java`
- `D` `backend/campuskey-backend/src/main/java/com/campuskey/backend/controllers/ReviewController.java`
- `D` `backend/campuskey-backend/src/main/java/com/campuskey/backend/controllers/RuleController.java`
- `D` `backend/campuskey-backend/src/main/java/com/campuskey/backend/controllers/StudentController.java`
- `D` `backend/campuskey-backend/src/main/java/com/campuskey/backend/controllers/UtilityController.java`
- `D` `backend/campuskey-backend/src/main/java/com/campuskey/backend/controllers/VideoController.java`
- `D` `backend/campuskey-backend/src/main/java/com/campuskey/backend/dto/AdminDashboardDto.java`
- `D` `backend/campuskey-backend/src/main/java/com/campuskey/backend/dto/LandlordDashboardDto.java`
- `D` `backend/campuskey-backend/src/main/java/com/campuskey/backend/dto/LandlordDto.java`
- `D` `backend/campuskey-backend/src/main/java/com/campuskey/backend/dto/LandlordVerificationDto.java`
- `D` `backend/campuskey-backend/src/main/java/com/campuskey/backend/dto/PropertyAmenityDto.java`
- `D` `backend/campuskey-backend/src/main/java/com/campuskey/backend/dto/PropertyDto.java`
- `D` `backend/campuskey-backend/src/main/java/com/campuskey/backend/dto/PropertyImageDto.java`
- `D` `backend/campuskey-backend/src/main/java/com/campuskey/backend/dto/PropertyRuleDto.java`
- `D` `backend/campuskey-backend/src/main/java/com/campuskey/backend/dto/PropertyUtilityDto.java`
- `D` `backend/campuskey-backend/src/main/java/com/campuskey/backend/dto/PropertyVerificationDto.java`
- `D` `backend/campuskey-backend/src/main/java/com/campuskey/backend/dto/PropertyVideoDto.java`
- `D` `backend/campuskey-backend/src/main/java/com/campuskey/backend/dto/RatingDto.java`
- `D` `backend/campuskey-backend/src/main/java/com/campuskey/backend/dto/StudentDto.java`
- `D` `backend/campuskey-backend/src/main/java/com/campuskey/backend/dto/UserDto.java`
- `D` `backend/campuskey-backend/src/main/java/com/campuskey/backend/entities/Admin.java`
- `D` `backend/campuskey-backend/src/main/java/com/campuskey/backend/entities/enumerations/AccountStatus.java`
- `M` `backend/campuskey-backend/src/main/java/com/campuskey/backend/entities/enumerations/AppRole.java`
- `D` `backend/campuskey-backend/src/main/java/com/campuskey/backend/entities/enumerations/PropertyStatus.java`
- `D` `backend/campuskey-backend/src/main/java/com/campuskey/backend/entities/Landlord.java`
- `D` `backend/campuskey-backend/src/main/java/com/campuskey/backend/entities/LandlordVerification.java`
- `D` `backend/campuskey-backend/src/main/java/com/campuskey/backend/entities/PasswordResetToken.java`
- `D` `backend/campuskey-backend/src/main/java/com/campuskey/backend/entities/Property.java`
- `D` `backend/campuskey-backend/src/main/java/com/campuskey/backend/entities/PropertyAmenity.java`
- `D` `backend/campuskey-backend/src/main/java/com/campuskey/backend/entities/PropertyImage.java`
- `D` `backend/campuskey-backend/src/main/java/com/campuskey/backend/entities/PropertyRule.java`
- `D` `backend/campuskey-backend/src/main/java/com/campuskey/backend/entities/PropertyUtility.java`
- `D` `backend/campuskey-backend/src/main/java/com/campuskey/backend/entities/PropertyVerification.java`
- `D` `backend/campuskey-backend/src/main/java/com/campuskey/backend/entities/PropertyVideo.java`
- `D` `backend/campuskey-backend/src/main/java/com/campuskey/backend/entities/Review.java`
- `D` `backend/campuskey-backend/src/main/java/com/campuskey/backend/entities/Role.java`
- `D` `backend/campuskey-backend/src/main/java/com/campuskey/backend/entities/Student.java`
- `D` `backend/campuskey-backend/src/main/java/com/campuskey/backend/entities/User.java`
- `A` `backend/campuskey-backend/src/main/java/com/campuskey/backend/exceptions/ApiErrorResponse.java`
- `A` `backend/campuskey-backend/src/main/java/com/campuskey/backend/exceptions/BadRequestException.java`
- `A` `backend/campuskey-backend/src/main/java/com/campuskey/backend/exceptions/ForbiddenException.java`
- `A` `backend/campuskey-backend/src/main/java/com/campuskey/backend/exceptions/GlobalExceptionHandler.java`
- `A` `backend/campuskey-backend/src/main/java/com/campuskey/backend/exceptions/ResourceNotFoundException.java`
- `A` `backend/campuskey-backend/src/main/java/com/campuskey/backend/infrastructure/ai/cache/SemanticCache.java`
- `A` `backend/campuskey-backend/src/main/java/com/campuskey/backend/infrastructure/ai/guardrails/ContentFilter.java`
- `A` `backend/campuskey-backend/src/main/java/com/campuskey/backend/infrastructure/ai/guardrails/CostTracker.java`
- `A` `backend/campuskey-backend/src/main/java/com/campuskey/backend/infrastructure/ai/guardrails/RateLimiter.java`
- `A` `backend/campuskey-backend/src/main/java/com/campuskey/backend/infrastructure/ai/guardrails/TocenBudgetManager.java`
- `A` `backend/campuskey-backend/src/main/java/com/campuskey/backend/infrastructure/ai/pipeline/DocumentIngestionPipeline.java`
- `A` `backend/campuskey-backend/src/main/java/com/campuskey/backend/infrastructure/ai/pipeline/RagPipeline.java`
- `A` `backend/campuskey-backend/src/main/java/com/campuskey/backend/infrastructure/ai/pipeline/ResponseFilterPipeline.java`
- `A` `backend/campuskey-backend/src/main/java/com/campuskey/backend/infrastructure/ai/provider/AiProvider.java`
- `A` `backend/campuskey-backend/src/main/java/com/campuskey/backend/infrastructure/ai/provider/AiProviderFactory.java`
- `A` `backend/campuskey-backend/src/main/java/com/campuskey/backend/infrastructure/ai/provider/GeminiProvider.java`
- `A` `backend/campuskey-backend/src/main/java/com/campuskey/backend/infrastructure/ai/provider/OllamaProvider.java`
- `A` `backend/campuskey-backend/src/main/java/com/campuskey/backend/infrastructure/ai/provider/OpenAiProvider.java`
- `A` `backend/campuskey-backend/src/main/java/com/campuskey/backend/infrastructure/ai/vectorstore/InMemoryVectorStore.java`
- `A` `backend/campuskey-backend/src/main/java/com/campuskey/backend/infrastructure/ai/vectorstore/PgVectorStore.java`
- `A` `backend/campuskey-backend/src/main/java/com/campuskey/backend/infrastructure/ai/vectorstore/QdrantVectorStore.java`
- `A` `backend/campuskey-backend/src/main/java/com/campuskey/backend/infrastructure/ai/vectorstore/VectorStore.java`
- `A` `backend/campuskey-backend/src/main/java/com/campuskey/backend/modules/ai/controllers/AiAdminController.java`
- `A` `backend/campuskey-backend/src/main/java/com/campuskey/backend/modules/ai/controllers/AiChatController.java`
- `A` `backend/campuskey-backend/src/main/java/com/campuskey/backend/modules/ai/controllers/RecommendationController.java`
- `A` `backend/campuskey-backend/src/main/java/com/campuskey/backend/modules/ai/dto/AiUsageMetrics.java`
- `A` `backend/campuskey-backend/src/main/java/com/campuskey/backend/modules/ai/dto/ChatRequest.java`
- `A` `backend/campuskey-backend/src/main/java/com/campuskey/backend/modules/ai/dto/ChatResponse.java`
- `A` `backend/campuskey-backend/src/main/java/com/campuskey/backend/modules/ai/dto/EmbeddingRequest.java`
- `A` `backend/campuskey-backend/src/main/java/com/campuskey/backend/modules/ai/dto/RecommendationRequest.java`
- `A` `backend/campuskey-backend/src/main/java/com/campuskey/backend/modules/ai/dto/RecommendationResponse.java`
- `A` `backend/campuskey-backend/src/main/java/com/campuskey/backend/modules/ai/entities/AiAuditLog.java`
- `A` `backend/campuskey-backend/src/main/java/com/campuskey/backend/modules/ai/entities/AiConversation.java`
- `A` `backend/campuskey-backend/src/main/java/com/campuskey/backend/modules/ai/entities/AiConversationMessage.java`
- `A` `backend/campuskey-backend/src/main/java/com/campuskey/backend/modules/ai/entities/UserPreferenceVector.java`
- `A` `backend/campuskey-backend/src/main/java/com/campuskey/backend/modules/ai/repositories/AiAuditLogRepository.java`
- `A` `backend/campuskey-backend/src/main/java/com/campuskey/backend/modules/ai/repositories/AiConversationRepository.java`
- `A` `backend/campuskey-backend/src/main/java/com/campuskey/backend/modules/ai/repositories/UserPreferenceVectorRepository.java`
- `A` `backend/campuskey-backend/src/main/java/com/campuskey/backend/modules/ai/services/AiChatService.java`
- `A` `backend/campuskey-backend/src/main/java/com/campuskey/backend/modules/ai/services/AiOrchestratorService.java`
- `A` `backend/campuskey-backend/src/main/java/com/campuskey/backend/modules/ai/services/EmbeddingService.java`
- `A` `backend/campuskey-backend/src/main/java/com/campuskey/backend/modules/ai/services/ListingEnhancementService.java`
- `A` `backend/campuskey-backend/src/main/java/com/campuskey/backend/modules/ai/services/PromptTemplateService.java`
- `A` `backend/campuskey-backend/src/main/java/com/campuskey/backend/modules/ai/services/RecommendationService.java`
- `A` `backend/campuskey-backend/src/main/java/com/campuskey/backend/modules/ai/services/SentimentAnalysisService.java`
- `A` `backend/campuskey-backend/src/main/java/com/campuskey/backend/modules/auth/config/AuthModuleSchedulingConfig.java`
- `A` `backend/campuskey-backend/src/main/java/com/campuskey/backend/modules/auth/config/PasswordResetSecurityProperties.java`
- `A` `backend/campuskey-backend/src/main/java/com/campuskey/backend/modules/auth/controller/AdminAuthAuditController.java`
- `A` `backend/campuskey-backend/src/main/java/com/campuskey/backend/modules/auth/controller/AuthController.java`
- `A` `backend/campuskey-backend/src/main/java/com/campuskey/backend/modules/auth/dto/AuthAuditEventAdminDto.java`
- `A` `backend/campuskey-backend/src/main/java/com/campuskey/backend/modules/auth/dto/AuthAuditEventFilter.java`
- `A` `backend/campuskey-backend/src/main/java/com/campuskey/backend/modules/auth/dto/AuthLoginRequest.java`
- `A` `backend/campuskey-backend/src/main/java/com/campuskey/backend/modules/auth/dto/AuthResponse.java`
- `A` `backend/campuskey-backend/src/main/java/com/campuskey/backend/modules/auth/dto/AuthSignupRequest.java`
- `A` `backend/campuskey-backend/src/main/java/com/campuskey/backend/modules/auth/dto/PasswordResetConfirmRequest.java`
- `A` `backend/campuskey-backend/src/main/java/com/campuskey/backend/modules/auth/dto/PasswordResetRequest.java`
- `A` `backend/campuskey-backend/src/main/java/com/campuskey/backend/modules/auth/entity/AuthAuditEvent.java`
- `A` `backend/campuskey-backend/src/main/java/com/campuskey/backend/modules/auth/entity/AuthAuditEventType.java`
- `A` `backend/campuskey-backend/src/main/java/com/campuskey/backend/modules/auth/entity/PasswordResetToken.java`
- `A` `backend/campuskey-backend/src/main/java/com/campuskey/backend/modules/auth/logging/AuthAuditStructuredLogger.java`
- `A` `backend/campuskey-backend/src/main/java/com/campuskey/backend/modules/auth/mapper/AuthAuditEventMapper.java`
- `A` `backend/campuskey-backend/src/main/java/com/campuskey/backend/modules/auth/mapper/AuthMapper.java`
- `A` `backend/campuskey-backend/src/main/java/com/campuskey/backend/modules/auth/repository/AuthAuditEventRepository.java`
- `A` `backend/campuskey-backend/src/main/java/com/campuskey/backend/modules/auth/repository/PasswordResetTokenRepository.java`
- `A` `backend/campuskey-backend/src/main/java/com/campuskey/backend/modules/auth/services/AuthAuditEventService.java`
- `A` `backend/campuskey-backend/src/main/java/com/campuskey/backend/modules/auth/services/AuthAuditQueryService.java`
- `A` `backend/campuskey-backend/src/main/java/com/campuskey/backend/modules/auth/services/AuthService.java`
- `A` `backend/campuskey-backend/src/main/java/com/campuskey/backend/modules/auth/services/LoggingPasswordResetDeliveryChannel.java`
- `A` `backend/campuskey-backend/src/main/java/com/campuskey/backend/modules/auth/services/PasswordResetAbusePolicyService.java`
- `A` `backend/campuskey-backend/src/main/java/com/campuskey/backend/modules/auth/services/PasswordResetDeliveryChannel.java`
- `A` `backend/campuskey-backend/src/main/java/com/campuskey/backend/modules/auth/services/PasswordResetLinkFactory.java`
- `A` `backend/campuskey-backend/src/main/java/com/campuskey/backend/modules/auth/services/PasswordResetTokenCleanupScheduler.java`
- `A` `backend/campuskey-backend/src/main/java/com/campuskey/backend/modules/auth/services/PasswordResetTokenMaintenanceService.java`
- `A` `backend/campuskey-backend/src/main/java/com/campuskey/backend/modules/bookings/controller/BookingController.java`
- `A` `backend/campuskey-backend/src/main/java/com/campuskey/backend/modules/bookings/dto/BookingDto.java`
- `A` `backend/campuskey-backend/src/main/java/com/campuskey/backend/modules/bookings/entity/Booking.java`
- `A` `backend/campuskey-backend/src/main/java/com/campuskey/backend/modules/bookings/mapper/BookingMapper.java`
- `A` `backend/campuskey-backend/src/main/java/com/campuskey/backend/modules/bookings/repository/BookingRepository.java`
- `A` `backend/campuskey-backend/src/main/java/com/campuskey/backend/modules/bookings/services/BookingService.java`
- `A` `backend/campuskey-backend/src/main/java/com/campuskey/backend/modules/emails/dto/EmailRequestDto.java`
- `A` `backend/campuskey-backend/src/main/java/com/campuskey/backend/modules/emails/dto/EmailResponseDto.java`
- `A` `backend/campuskey-backend/src/main/java/com/campuskey/backend/modules/emails/entity/EmailMessage.java`
- `A` `backend/campuskey-backend/src/main/java/com/campuskey/backend/modules/emails/mapper/EmailMapper.java`
- `A` `backend/campuskey-backend/src/main/java/com/campuskey/backend/modules/emails/repository/EmailMessageRepository.java`
- `A` `backend/campuskey-backend/src/main/java/com/campuskey/backend/modules/emails/services/EmailService.java`
- `A` `backend/campuskey-backend/src/main/java/com/campuskey/backend/modules/notifications/controller/NotificationController.java`
- `A` `backend/campuskey-backend/src/main/java/com/campuskey/backend/modules/notifications/dto/NotificationDto.java`
- `A` `backend/campuskey-backend/src/main/java/com/campuskey/backend/modules/notifications/entity/Notification.java`
- `A` `backend/campuskey-backend/src/main/java/com/campuskey/backend/modules/notifications/mapper/NotificationMapper.java`
- `A` `backend/campuskey-backend/src/main/java/com/campuskey/backend/modules/notifications/repository/NotificationRepository.java`
- `A` `backend/campuskey-backend/src/main/java/com/campuskey/backend/modules/notifications/services/NotificationService.java`
- `A` `backend/campuskey-backend/src/main/java/com/campuskey/backend/modules/properties/controller/AmenityController.java`
- `A` `backend/campuskey-backend/src/main/java/com/campuskey/backend/modules/properties/controller/PropertyController.java`
- `A` `backend/campuskey-backend/src/main/java/com/campuskey/backend/modules/properties/controller/PropertyImageController.java`
- `A` `backend/campuskey-backend/src/main/java/com/campuskey/backend/modules/properties/controller/PropertyVideoController.java`
- `A` `backend/campuskey-backend/src/main/java/com/campuskey/backend/modules/properties/dto/PropertyAmenityDto.java`
- `A` `backend/campuskey-backend/src/main/java/com/campuskey/backend/modules/properties/dto/PropertyDto.java`
- `A` `backend/campuskey-backend/src/main/java/com/campuskey/backend/modules/properties/dto/PropertyImageDto.java`
- `A` `backend/campuskey-backend/src/main/java/com/campuskey/backend/modules/properties/dto/PropertyRuleDto.java`
- `A` `backend/campuskey-backend/src/main/java/com/campuskey/backend/modules/properties/dto/PropertyUtilityDto.java`
- `A` `backend/campuskey-backend/src/main/java/com/campuskey/backend/modules/properties/dto/PropertyVerificationDto.java`
- `A` `backend/campuskey-backend/src/main/java/com/campuskey/backend/modules/properties/dto/PropertyVideoDto.java`
- `A` `backend/campuskey-backend/src/main/java/com/campuskey/backend/modules/properties/entity/Property.java`
- `A` `backend/campuskey-backend/src/main/java/com/campuskey/backend/modules/properties/entity/PropertyAmenity.java`
- `A` `backend/campuskey-backend/src/main/java/com/campuskey/backend/modules/properties/entity/PropertyImage.java`
- `A` `backend/campuskey-backend/src/main/java/com/campuskey/backend/modules/properties/entity/PropertyRule.java`
- `A` `backend/campuskey-backend/src/main/java/com/campuskey/backend/modules/properties/entity/PropertyUtility.java`
- `A` `backend/campuskey-backend/src/main/java/com/campuskey/backend/modules/properties/entity/PropertyVerification.java`
- `A` `backend/campuskey-backend/src/main/java/com/campuskey/backend/modules/properties/entity/PropertyVideo.java`
- `A` `backend/campuskey-backend/src/main/java/com/campuskey/backend/modules/properties/repository/PropertyAmenityRepository.java`
- `A` `backend/campuskey-backend/src/main/java/com/campuskey/backend/modules/properties/repository/PropertyImageRepository.java`
- `A` `backend/campuskey-backend/src/main/java/com/campuskey/backend/modules/properties/repository/PropertyRepository.java`
- `A` `backend/campuskey-backend/src/main/java/com/campuskey/backend/modules/properties/repository/PropertyRuleRepository.java`
- `A` `backend/campuskey-backend/src/main/java/com/campuskey/backend/modules/properties/repository/PropertyUtilityRepository.java`
- `A` `backend/campuskey-backend/src/main/java/com/campuskey/backend/modules/properties/repository/PropertyVerificationRepository.java`
- `A` `backend/campuskey-backend/src/main/java/com/campuskey/backend/modules/properties/repository/PropertyVideoRepository.java`
- `A` `backend/campuskey-backend/src/main/java/com/campuskey/backend/modules/properties/services/PropertyAmenityService.java`
- `A` `backend/campuskey-backend/src/main/java/com/campuskey/backend/modules/properties/services/PropertyImageService.java`
- `A` `backend/campuskey-backend/src/main/java/com/campuskey/backend/modules/properties/services/PropertyRuleService.java`
- `A` `backend/campuskey-backend/src/main/java/com/campuskey/backend/modules/properties/services/PropertyVerificationService.java`
- `A` `backend/campuskey-backend/src/main/java/com/campuskey/backend/modules/properties/services/PropertyVideoService.java`
- `A` `backend/campuskey-backend/src/main/java/com/campuskey/backend/modules/reviews/controller/ReviesController.java`
- `A` `backend/campuskey-backend/src/main/java/com/campuskey/backend/modules/reviews/controller/ReviewController.java`
- `A` `backend/campuskey-backend/src/main/java/com/campuskey/backend/modules/reviews/dto/RatingDto.java`
- `A` `backend/campuskey-backend/src/main/java/com/campuskey/backend/modules/reviews/dto/ReviewDto.java`
- `A` `backend/campuskey-backend/src/main/java/com/campuskey/backend/modules/reviews/entity/Review.java`
- `A` `backend/campuskey-backend/src/main/java/com/campuskey/backend/modules/reviews/mapper/ReviewMapper.java`
- `A` `backend/campuskey-backend/src/main/java/com/campuskey/backend/modules/reviews/repository/ReviewRepository.java`
- `A` `backend/campuskey-backend/src/main/java/com/campuskey/backend/modules/reviews/services/RatingService.java`
- `A` `backend/campuskey-backend/src/main/java/com/campuskey/backend/modules/reviews/services/ReviewService.java`
- `A` `backend/campuskey-backend/src/main/java/com/campuskey/backend/modules/users/controller/AdminController.java`
- `A` `backend/campuskey-backend/src/main/java/com/campuskey/backend/modules/users/controller/LandlordController.java`
- `A` `backend/campuskey-backend/src/main/java/com/campuskey/backend/modules/users/controller/LandlordVerificationController.java`
- `A` `backend/campuskey-backend/src/main/java/com/campuskey/backend/modules/users/controller/StudentController.java`
- `A` `backend/campuskey-backend/src/main/java/com/campuskey/backend/modules/users/dto/AdminDashboardDto.java`
- `A` `backend/campuskey-backend/src/main/java/com/campuskey/backend/modules/users/dto/LandlordDashboardDto.java`
- `A` `backend/campuskey-backend/src/main/java/com/campuskey/backend/modules/users/dto/LandlordDto.java`
- `A` `backend/campuskey-backend/src/main/java/com/campuskey/backend/modules/users/dto/LandlordVerificationDto.java`
- `A` `backend/campuskey-backend/src/main/java/com/campuskey/backend/modules/users/dto/StudentDto.java`
- `A` `backend/campuskey-backend/src/main/java/com/campuskey/backend/modules/users/dto/UpdateSignUpMethodRequest.java`
- `A` `backend/campuskey-backend/src/main/java/com/campuskey/backend/modules/users/dto/UserDto.java`
- `A` `backend/campuskey-backend/src/main/java/com/campuskey/backend/modules/users/entity/Admin.java`
- `A` `backend/campuskey-backend/src/main/java/com/campuskey/backend/modules/users/entity/Landlord.java`
- `A` `backend/campuskey-backend/src/main/java/com/campuskey/backend/modules/users/entity/LandlordVerification.java`
- `A` `backend/campuskey-backend/src/main/java/com/campuskey/backend/modules/users/entity/Role.java`
- `A` `backend/campuskey-backend/src/main/java/com/campuskey/backend/modules/users/entity/Student.java`
- `A` `backend/campuskey-backend/src/main/java/com/campuskey/backend/modules/users/entity/User.java`
- `A` `backend/campuskey-backend/src/main/java/com/campuskey/backend/modules/users/mapper/UserMapper.java`
- `A` `backend/campuskey-backend/src/main/java/com/campuskey/backend/modules/users/repository/AdminRepository.java`
- `A` `backend/campuskey-backend/src/main/java/com/campuskey/backend/modules/users/repository/LandlordRepository.java`
- `A` `backend/campuskey-backend/src/main/java/com/campuskey/backend/modules/users/repository/LandlordVerificationRepository.java`
- `A` `backend/campuskey-backend/src/main/java/com/campuskey/backend/modules/users/repository/RoleRepository.java`
- `A` `backend/campuskey-backend/src/main/java/com/campuskey/backend/modules/users/repository/StudentRepository.java`
- `A` `backend/campuskey-backend/src/main/java/com/campuskey/backend/modules/users/repository/UserRepository.java`
- `A` `backend/campuskey-backend/src/main/java/com/campuskey/backend/modules/users/services/AdminService.java`
- `A` `backend/campuskey-backend/src/main/java/com/campuskey/backend/modules/users/services/LandlordApplicationService.java`
- `A` `backend/campuskey-backend/src/main/java/com/campuskey/backend/modules/users/services/LandlordService.java`
- `A` `backend/campuskey-backend/src/main/java/com/campuskey/backend/modules/users/services/LandlordVerificationService.java`
- `A` `backend/campuskey-backend/src/main/java/com/campuskey/backend/modules/users/services/StudentService.java`
- `A` `backend/campuskey-backend/src/main/java/com/campuskey/backend/modules/users/services/UserService.java`
- `D` `backend/campuskey-backend/src/main/java/com/campuskey/backend/repositories/DashboardRepository.java`
- `D` `backend/campuskey-backend/src/main/java/com/campuskey/backend/repositories/LandlordRepository.java`
- `D` `backend/campuskey-backend/src/main/java/com/campuskey/backend/repositories/LandlordVerificationRepository.java`
- `D` `backend/campuskey-backend/src/main/java/com/campuskey/backend/repositories/PasswordResetTokenRepository.java`
- `D` `backend/campuskey-backend/src/main/java/com/campuskey/backend/repositories/PropertyAmenityRepository.java`
- `D` `backend/campuskey-backend/src/main/java/com/campuskey/backend/repositories/PropertyImageRepository.java`
- `D` `backend/campuskey-backend/src/main/java/com/campuskey/backend/repositories/PropertyRepository.java`
- `D` `backend/campuskey-backend/src/main/java/com/campuskey/backend/repositories/PropertyRuleRepository.java`
- `D` `backend/campuskey-backend/src/main/java/com/campuskey/backend/repositories/PropertyUtilityRepository.java`
- `D` `backend/campuskey-backend/src/main/java/com/campuskey/backend/repositories/PropertyVerificationRepository.java`
- `D` `backend/campuskey-backend/src/main/java/com/campuskey/backend/repositories/PropertyVideoRepository.java`
- `D` `backend/campuskey-backend/src/main/java/com/campuskey/backend/repositories/ReviewRepository.java`
- `D` `backend/campuskey-backend/src/main/java/com/campuskey/backend/repositories/RoleRepository.java`
- `D` `backend/campuskey-backend/src/main/java/com/campuskey/backend/repositories/StudentRepository.java`
- `D` `backend/campuskey-backend/src/main/java/com/campuskey/backend/repositories/UserRepository.java`
- `D` `backend/campuskey-backend/src/main/java/com/campuskey/backend/requests/ReviewRequest.java`
- `M` `backend/campuskey-backend/src/main/java/com/campuskey/backend/security/SecurityConfig.java`
- `M` `backend/campuskey-backend/src/main/java/com/campuskey/backend/security/services/UserDetailsImpl.java`
- `M` `backend/campuskey-backend/src/main/java/com/campuskey/backend/security/services/UserDetailsServiceImpl.java`
- `D` `backend/campuskey-backend/src/main/java/com/campuskey/backend/services/AdminService.java`
- `D` `backend/campuskey-backend/src/main/java/com/campuskey/backend/services/DashboardService.java`
- `D` `backend/campuskey-backend/src/main/java/com/campuskey/backend/services/impl/UserServiceImpl.java`
- `D` `backend/campuskey-backend/src/main/java/com/campuskey/backend/services/LandlordApplicationService.java`
- `D` `backend/campuskey-backend/src/main/java/com/campuskey/backend/services/LandlordService.java`
- `D` `backend/campuskey-backend/src/main/java/com/campuskey/backend/services/LandlordVerificationService.java`
- `D` `backend/campuskey-backend/src/main/java/com/campuskey/backend/services/PropertyAmenityService.java`
- `D` `backend/campuskey-backend/src/main/java/com/campuskey/backend/services/PropertyImageService.java`
- `D` `backend/campuskey-backend/src/main/java/com/campuskey/backend/services/PropertyRuleService.java`
- `D` `backend/campuskey-backend/src/main/java/com/campuskey/backend/services/PropertyService.java`
- `D` `backend/campuskey-backend/src/main/java/com/campuskey/backend/services/PropertyUtilityService.java`
- `D` `backend/campuskey-backend/src/main/java/com/campuskey/backend/services/PropertyVerificationService.java`
- `D` `backend/campuskey-backend/src/main/java/com/campuskey/backend/services/PropertyVideoService.java`
- `D` `backend/campuskey-backend/src/main/java/com/campuskey/backend/services/RatingService.java`
- `D` `backend/campuskey-backend/src/main/java/com/campuskey/backend/services/ReviewService.java`
- `D` `backend/campuskey-backend/src/main/java/com/campuskey/backend/services/StudentService.java`
- `D` `backend/campuskey-backend/src/main/java/com/campuskey/backend/services/UserService.java`
- `D` `backend/campuskey-backend/src/main/java/com/campuskey/backend/specification/PropertySpecification.java`
- `D` `backend/campuskey-backend/src/main/java/com/campuskey/backend/utils/EmailService.java`
- `A` `backend/campuskey-backend/src/resources/application.yml`
- `A` `backend/campuskey-backend/src/resources/application-ai.yml`
- `A` `backend/campuskey-backend/src/resources/application-dev.yml`
- `A` `backend/campuskey-backend/src/resources/application-test.yml`
- `A` `backend/campuskey-backend/src/resources/db/migration/V1_initial_schema.sql`
- `A` `backend/campuskey-backend/src/resources/db/migration/V2_ai_table.sql`
- `A` `backend/campuskey-backend/src/resources/logback-spring.xml`
- `A` `backend/campuskey-backend/src/test/java/com/campuskey/backend/ai/AiChatServiceTest.java`
- `A` `backend/campuskey-backend/src/test/java/com/campuskey/backend/ai/AiProviderMockTest.java`
- `A` `backend/campuskey-backend/src/test/java/com/campuskey/backend/ai/ContentFilter.java`
- `A` `backend/campuskey-backend/src/test/java/com/campuskey/backend/ai/RagPipelineTest.java`
- `A` `backend/campuskey-backend/src/test/java/com/campuskey/backend/ai/RecommendationServiceTest.java`
- `A` `backend/campuskey-backend/src/test/java/com/campuskey/backend/ai/SemanticCacheTest.java`
- `A` `backend/campuskey-backend/src/test/java/com/campuskey/backend/modules/auth/services/PasswordResetAbusePolicyServiceTest.java`
- `A` `backend/campuskey-backend/src/test/java/com/campuskey/backend/modules/notifications/services/NotificationServiceTest.java`
- `A` `backend/campuskey-backend/src/test/resources/ai-test-fixtures/expected-response.json`
- `A` `backend/campuskey-backend/src/test/resources/ai-test-fixtures/sample-prompts.json`
- `A` `backend/campuskey-backend/target/classes/application.properties`
- `A` `backend/campuskey-backend/target/classes/com/campuskey/backend/CampusKeyApplication.class`
- `A` `backend/campuskey-backend/target/classes/com/campuskey/backend/entities/enumerations/AppRole.class`
- `A` `backend/campuskey-backend/target/classes/com/campuskey/backend/exceptions/ApiErrorResponse.class`
- `A` `backend/campuskey-backend/target/classes/com/campuskey/backend/exceptions/BadRequestException.class`
- `A` `backend/campuskey-backend/target/classes/com/campuskey/backend/exceptions/ForbiddenException.class`
- `A` `backend/campuskey-backend/target/classes/com/campuskey/backend/exceptions/GlobalExceptionHandler.class`
- `A` `backend/campuskey-backend/target/classes/com/campuskey/backend/exceptions/ResourceNotFoundException.class`
- `A` `backend/campuskey-backend/target/classes/com/campuskey/backend/exceptions/UnauthorizedException.class`
- `A` `backend/campuskey-backend/target/classes/com/campuskey/backend/infrastructure/ai/guardrails/ContentFilter.class`
- `A` `backend/campuskey-backend/target/classes/com/campuskey/backend/infrastructure/ai/guardrails/RateLimiter.class`
- `A` `backend/campuskey-backend/target/classes/com/campuskey/backend/infrastructure/ai/guardrails/TocenBudgetManager.class`
- `A` `backend/campuskey-backend/target/classes/com/campuskey/backend/modules/ai/dto/ChatRequest.class`
- `A` `backend/campuskey-backend/target/classes/com/campuskey/backend/modules/ai/dto/ChatResponse.class`
- `A` `backend/campuskey-backend/target/classes/com/campuskey/backend/modules/ai/services/AiOrchestratorService.class`
- `A` `backend/campuskey-backend/target/classes/com/campuskey/backend/modules/auth/config/AuthModuleSchedulingConfig.class`
- `A` `backend/campuskey-backend/target/classes/com/campuskey/backend/modules/auth/config/PasswordResetSecurityProperties.class`
- `A` `backend/campuskey-backend/target/classes/com/campuskey/backend/modules/auth/controller/AdminAuthAuditController.class`
- `A` `backend/campuskey-backend/target/classes/com/campuskey/backend/modules/auth/controller/AuthController.class`
- `A` `backend/campuskey-backend/target/classes/com/campuskey/backend/modules/auth/dto/AuthAuditEventAdminDto.class`
- `A` `backend/campuskey-backend/target/classes/com/campuskey/backend/modules/auth/dto/AuthAuditEventFilter.class`
- `A` `backend/campuskey-backend/target/classes/com/campuskey/backend/modules/auth/dto/AuthLoginRequest.class`
- `A` `backend/campuskey-backend/target/classes/com/campuskey/backend/modules/auth/dto/AuthResponse.class`
- `A` `backend/campuskey-backend/target/classes/com/campuskey/backend/modules/auth/dto/AuthSignupRequest.class`
- `A` `backend/campuskey-backend/target/classes/com/campuskey/backend/modules/auth/dto/PasswordResetConfirmRequest.class`
- `A` `backend/campuskey-backend/target/classes/com/campuskey/backend/modules/auth/dto/PasswordResetRequest.class`
- `A` `backend/campuskey-backend/target/classes/com/campuskey/backend/modules/auth/entity/AuthAuditEvent.class`
- `A` `backend/campuskey-backend/target/classes/com/campuskey/backend/modules/auth/entity/AuthAuditEventType.class`
- `A` `backend/campuskey-backend/target/classes/com/campuskey/backend/modules/auth/entity/PasswordResetToken.class`
- `A` `backend/campuskey-backend/target/classes/com/campuskey/backend/modules/auth/logging/AuthAuditStructuredLogger.class`
- `A` `backend/campuskey-backend/target/classes/com/campuskey/backend/modules/auth/mapper/AuthAuditEventMapper.class`
- `A` `backend/campuskey-backend/target/classes/com/campuskey/backend/modules/auth/mapper/AuthMapper.class`
- `A` `backend/campuskey-backend/target/classes/com/campuskey/backend/modules/auth/repository/AuthAuditEventRepository.class`
- `A` `backend/campuskey-backend/target/classes/com/campuskey/backend/modules/auth/repository/PasswordResetTokenRepository.class`
- `A` `backend/campuskey-backend/target/classes/com/campuskey/backend/modules/auth/services/AuthAuditEventService.class`
- `A` `backend/campuskey-backend/target/classes/com/campuskey/backend/modules/auth/services/AuthAuditQueryService.class`
- `A` `backend/campuskey-backend/target/classes/com/campuskey/backend/modules/auth/services/AuthService.class`
- `A` `backend/campuskey-backend/target/classes/com/campuskey/backend/modules/auth/services/LoggingPasswordResetDeliveryChannel.class`
- `A` `backend/campuskey-backend/target/classes/com/campuskey/backend/modules/auth/services/PasswordResetAbusePolicyService.class`
- `A` `backend/campuskey-backend/target/classes/com/campuskey/backend/modules/auth/services/PasswordResetDeliveryChannel.class`
- `A` `backend/campuskey-backend/target/classes/com/campuskey/backend/modules/auth/services/PasswordResetLinkFactory.class`
- `A` `backend/campuskey-backend/target/classes/com/campuskey/backend/modules/auth/services/PasswordResetTokenCleanupScheduler.class`
- `A` `backend/campuskey-backend/target/classes/com/campuskey/backend/modules/auth/services/PasswordResetTokenMaintenanceService.class`
- `A` `backend/campuskey-backend/target/classes/com/campuskey/backend/modules/bookings/controller/BookingController.class`
- `A` `backend/campuskey-backend/target/classes/com/campuskey/backend/modules/bookings/dto/BookingDto.class`
- `A` `backend/campuskey-backend/target/classes/com/campuskey/backend/modules/bookings/entity/Booking$BookingStatus.class`
- `A` `backend/campuskey-backend/target/classes/com/campuskey/backend/modules/bookings/entity/Booking.class`
- `A` `backend/campuskey-backend/target/classes/com/campuskey/backend/modules/bookings/mapper/BookingMapper.class`
- `A` `backend/campuskey-backend/target/classes/com/campuskey/backend/modules/bookings/repository/BookingRepository.class`
- `A` `backend/campuskey-backend/target/classes/com/campuskey/backend/modules/bookings/services/BookingService.class`
- `A` `backend/campuskey-backend/target/classes/com/campuskey/backend/modules/emails/dto/EmailRequestDto.class`
- `A` `backend/campuskey-backend/target/classes/com/campuskey/backend/modules/emails/dto/EmailResponseDto.class`
- `A` `backend/campuskey-backend/target/classes/com/campuskey/backend/modules/emails/entity/EmailMessage$EmailStatus.class`
- `A` `backend/campuskey-backend/target/classes/com/campuskey/backend/modules/emails/entity/EmailMessage.class`
- `A` `backend/campuskey-backend/target/classes/com/campuskey/backend/modules/emails/mapper/EmailMapper.class`
- `A` `backend/campuskey-backend/target/classes/com/campuskey/backend/modules/emails/repository/EmailMessageRepository.class`
- `A` `backend/campuskey-backend/target/classes/com/campuskey/backend/modules/emails/services/EmailService.class`
- `A` `backend/campuskey-backend/target/classes/com/campuskey/backend/modules/notifications/controller/NotificationController.class`
- `A` `backend/campuskey-backend/target/classes/com/campuskey/backend/modules/notifications/dto/NotificationDto.class`
- `A` `backend/campuskey-backend/target/classes/com/campuskey/backend/modules/notifications/entity/Notification$NotificationType.class`
- `A` `backend/campuskey-backend/target/classes/com/campuskey/backend/modules/notifications/entity/Notification.class`
- `A` `backend/campuskey-backend/target/classes/com/campuskey/backend/modules/notifications/mapper/NotificationMapper.class`
- `A` `backend/campuskey-backend/target/classes/com/campuskey/backend/modules/notifications/repository/NotificationRepository.class`
- `A` `backend/campuskey-backend/target/classes/com/campuskey/backend/modules/notifications/services/NotificationService.class`
- `A` `backend/campuskey-backend/target/classes/com/campuskey/backend/modules/reviews/controller/ReviewController.class`
- `A` `backend/campuskey-backend/target/classes/com/campuskey/backend/modules/reviews/dto/ReviewDto.class`
- `A` `backend/campuskey-backend/target/classes/com/campuskey/backend/modules/reviews/entity/Review.class`
- `A` `backend/campuskey-backend/target/classes/com/campuskey/backend/modules/reviews/mapper/ReviewMapper.class`
- `A` `backend/campuskey-backend/target/classes/com/campuskey/backend/modules/reviews/repository/ReviewRepository.class`
- `A` `backend/campuskey-backend/target/classes/com/campuskey/backend/modules/reviews/services/ReviewService.class`
- `A` `backend/campuskey-backend/target/classes/com/campuskey/backend/modules/users/controller/AdminController.class`
- `A` `backend/campuskey-backend/target/classes/com/campuskey/backend/modules/users/dto/UpdateSignUpMethodRequest.class`
- `A` `backend/campuskey-backend/target/classes/com/campuskey/backend/modules/users/dto/UserDto.class`
- `A` `backend/campuskey-backend/target/classes/com/campuskey/backend/modules/users/entity/Role.class`
- `A` `backend/campuskey-backend/target/classes/com/campuskey/backend/modules/users/entity/User.class`
- `A` `backend/campuskey-backend/target/classes/com/campuskey/backend/modules/users/mapper/UserMapper.class`
- `A` `backend/campuskey-backend/target/classes/com/campuskey/backend/modules/users/repository/RoleRepository.class`
- `A` `backend/campuskey-backend/target/classes/com/campuskey/backend/modules/users/repository/UserRepository.class`
- `A` `backend/campuskey-backend/target/classes/com/campuskey/backend/modules/users/services/UserService.class`
- `A` `backend/campuskey-backend/target/classes/com/campuskey/backend/security/jwt/AuthEntryPointJwt.class`
- `A` `backend/campuskey-backend/target/classes/com/campuskey/backend/security/jwt/AuthTokenFilter.class`
- `A` `backend/campuskey-backend/target/classes/com/campuskey/backend/security/jwt/JwtUtils.class`
- `A` `backend/campuskey-backend/target/classes/com/campuskey/backend/security/requests/LoginRequest.class`
- `A` `backend/campuskey-backend/target/classes/com/campuskey/backend/security/requests/SignupRequest.class`
- `A` `backend/campuskey-backend/target/classes/com/campuskey/backend/security/response/LoginResponse.class`
- `A` `backend/campuskey-backend/target/classes/com/campuskey/backend/security/response/MessageResponse.class`
- `A` `backend/campuskey-backend/target/classes/com/campuskey/backend/security/response/UserInfoResponse.class`
- `A` `backend/campuskey-backend/target/classes/com/campuskey/backend/security/SecurityConfig.class`
- `A` `backend/campuskey-backend/target/classes/com/campuskey/backend/security/services/UserDetailsImpl.class`
- `A` `backend/campuskey-backend/target/classes/com/campuskey/backend/security/services/UserDetailsServiceImpl.class`
- `A` `backend/campuskey-backend/target/classes/com/campuskey/backend/security/WebConfig$1.class`
- `A` `backend/campuskey-backend/target/classes/com/campuskey/backend/security/WebConfig.class`
- `A` `backend/campuskey-backend/target/maven-status/maven-compiler-plugin/compile/default-compile/createdFiles.lst`
- `A` `backend/campuskey-backend/target/maven-status/maven-compiler-plugin/compile/default-compile/inputFiles.lst`
- `A` `backend/campuskey-backend/target/maven-status/maven-compiler-plugin/testCompile/default-testCompile/createdFiles.lst`
- `A` `backend/campuskey-backend/target/maven-status/maven-compiler-plugin/testCompile/default-testCompile/inputFiles.lst`
- `A` `backend/campuskey-backend/target/surefire-reports/2026-04-10T22-38-08_778.dumpstream`
- `A` `backend/campuskey-backend/target/surefire-reports/com.campuskey.backend.modules.notifications.services.NotificationServiceTest.txt`
- `A` `backend/campuskey-backend/target/surefire-reports/TEST-com.campuskey.backend.modules.notifications.services.NotificationServiceTest.xml`
- `A` `backend/campuskey-backend/target/test-classes/ai-test-fixtures/expected-response.json`
- `A` `backend/campuskey-backend/target/test-classes/ai-test-fixtures/sample-prompts.json`
- `A` `backend/campuskey-backend/target/test-classes/com/campuskey/backend/CampuskeyBackendApplicationTests.class`
- `A` `backend/campuskey-backend/target/test-classes/com/campuskey/backend/modules/auth/services/PasswordResetAbusePolicyServiceTest.class`
- `A` `backend/campuskey-backend/target/test-classes/com/campuskey/backend/modules/notifications/services/NotificationServiceTest.class`

</details>

<details>
<summary>frontend (20 files)</summary>

- `A` `frontend/campuskey/docker/.dockerignore`
- `A` `frontend/campuskey/docker/docker-compose.yml`
- `A` `frontend/campuskey/docker/Dockerfile`
- `A` `frontend/campuskey/src/api/aiApi.js`
- `A` `frontend/campuskey/src/api/axiosInstance.js`
- `A` `frontend/campuskey/src/components/ai/AiChatMessage.jsx`
- `A` `frontend/campuskey/src/components/ai/AiChatWidget.jsx`
- `A` `frontend/campuskey/src/components/ai/AiInsightBadge.jsx`
- `A` `frontend/campuskey/src/components/ai/AiLoadingIndicator.jsx`
- `A` `frontend/campuskey/src/components/ai/AiRecommendationCard.jsx`
- `A` `frontend/campuskey/src/components/ai/SmartSearchBar.jsx`
- `A` `frontend/campuskey/src/hooks/ai/useAiChat.js`
- `A` `frontend/campuskey/src/hooks/ai/useRecommendation.js`
- `A` `frontend/campuskey/src/hooks/ai/useSmartSearch.js`
- `A` `frontend/campuskey/src/hooks/useAuth.js`
- `A` `frontend/campuskey/src/pages/admin/AiDashboardPage.jsx`
- `A` `frontend/campuskey/src/pages/landlord/AiListingEnhancerPage.jsx`
- `A` `frontend/campuskey/src/pages/student/AiRecommendationPage.jsx`
- `A` `frontend/campuskey/src/store/aiStore.js`
- `A` `frontend/campuskey/src/utils/aiUtils.js`

</details>

<details>
<summary>docker (15 files)</summary>

- `A` `docker/.dockerignore`
- `A` `docker/configs/prometheus.yml`
- `A` `docker/configs/promtail-config.yml`
- `A` `docker/configs/redis.conf`
- `A` `docker/docker-compose.dev.yml`
- `A` `docker/docker-compose.prod.yml`
- `A` `docker/docker-compose.yml`
- `A` `docker/Dockerfile.backend`
- `A` `docker/Dockerfile.frontend`
- `A` `docker/infrastructure/ai.compose.yml`
- `A` `docker/infrastructure/observability.compose.yml`
- `A` `docker/services/backend.compose.yml`
- `A` `docker/services/database.compose.yml`
- `A` `docker/services/frontend.compose.yml`
- `A` `docker/services/redis.compose.yml`

</details>

<details>
<summary>docs (7 files)</summary>

- `A` `docs/ai/ai-architecture.md`
- `A` `docs/ai/data-privacy-ai.md`
- `A` `docs/ai/model-evaluation.md`
- `A` `docs/ai/prompt-engineering-guide.md`
- `A` `docs/api-specs.md`
- `A` `docs/architecture-decision.md`
- `A` `docs/deployment-guide.md`

</details>

<details>
<summary>ai-models (7 files)</summary>

- `A` `ai-models/embeddings/README.md`
- `A` `ai-models/evaluation/benchmark-results.json`
- `A` `ai-models/evaluation/test-case.json`
- `A` `ai-models/prompts/chatbot-assistant.txt`
- `A` `ai-models/prompts/listing-enhancement.txt`
- `A` `ai-models/prompts/property-recommendation.txt`
- `A` `ai-models/prompts/review-sentiment.txt`

</details>

<details>
<summary>.idea (4 files)</summary>

- `M` `.idea/compiler.xml`
- `A` `.idea/copilot.data.migration.ask2agent.xml`
- `A` `.idea/copilotDiffState.xml`
- `M` `.idea/workspace.xml`

</details>

<details>
<summary>.github (3 files)</summary>

- `A` `.github/workflows/ai-model-test.yml`
- `A` `.github/workflows/ci-cd-pipeline.yml`
- `A` `.github/workflows/codeql-analysis.yml`

</details>

<details>
<summary>hs_err_pid114612.log (1 files)</summary>

- `A` `hs_err_pid114612.log`

</details>

<details>
<summary>replay_pid114612.log (1 files)</summary>

- `A` `replay_pid114612.log`

</details>

<details>
<summary>plan-controlledSpringBackendPipeline.prompt.md (1 files)</summary>

- `A` `plan-controlledSpringBackendPipeline.prompt.md`

</details>

<details>
<summary>.env.example (1 files)</summary>

- `A` `.env.example`

</details>

<details>
<summary>.editorconfig (1 files)</summary>

- `A` `.editorconfig`

</details>

<details>
<summary>.gitignore (1 files)</summary>

- `A` `.gitignore`

</details>

<details>
<summary>.dockerignore (1 files)</summary>

- `A` `.dockerignore`

</details>

<details>
<summary>Makefile (1 files)</summary>

- `A` `Makefile`

</details>

