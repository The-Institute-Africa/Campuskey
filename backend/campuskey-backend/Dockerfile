FROM eclipse-temurin:21-jdk AS build
WORKDIR /workspace

COPY gradlew settings.gradle build.gradle ./
COPY gradle ./gradle
RUN chmod +x ./gradlew && ./gradlew dependencies --no-daemon --quiet

COPY src ./src
RUN ./gradlew clean bootJar --no-daemon

FROM eclipse-temurin:21-jre-alpine
RUN apk add --no-cache su-exec \
    && addgroup -S campuskey \
    && adduser -S -G campuskey campuskey
WORKDIR /app
COPY --from=build /workspace/build/libs/campuskey-backend-0.0.1-SNAPSHOT.jar /app/app.jar
COPY docker-entrypoint.sh /usr/local/bin/campuskey-entrypoint
RUN chmod 0555 /usr/local/bin/campuskey-entrypoint
EXPOSE 8080
ENTRYPOINT ["/usr/local/bin/campuskey-entrypoint"]
