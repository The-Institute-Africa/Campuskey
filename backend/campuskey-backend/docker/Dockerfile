FROM eclipse-temurin:21-jdk-alpine AS builder

WORKDIR /app

RUN apk add --no-cache maven

COPY pom.xml ./
RUN mvn dependency:go-offline -B

COPY src ./src
RUN mvn clean package -DskipTests -B

FROM eclipse-temurin:21-jre-alpine AS runner

LABEL maintainer="CampusKey Team"
LABEL org.opencontainers.image.source="https://github.com/<OWNER>/Campuskey"

ARG SPRING_PROFILES_ACTIVE=prod
ENV SPRING_PROFILES_ACTIVE=${SPRING_PROFILES_ACTIVE}

RUN apk add --no-cache curl \
	&& addgroup -S appgroup \
	&& adduser -S appuser -u 1001 -G appgroup

WORKDIR /app

COPY --from=builder /app/target/campuskey-backend-0.0.1-SNAPSHOT.jar ./app.jar

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
	CMD curl -f http://localhost:8080/actuator/health

USER appuser

ENTRYPOINT ["java", "-jar", "app.jar"]


