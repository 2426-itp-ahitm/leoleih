# Build stage
FROM eclipse-temurin:21-jdk AS builder
WORKDIR /build

RUN pwd
RUN ls -a /

# Copy Maven wrapper and pom.xml
COPY mvnw ./
COPY .mvn .mvn
COPY pom.xml ./

# Download dependencies (this layer will be cached)
RUN ./mvnw dependency:go-offline

# Copy source code and build
COPY src ./src
RUN ./mvnw clean package -DskipTests

# Runtime stage
FROM eclipse-temurin:21-jre
WORKDIR /opt/application
COPY --from=builder /build/target/*-runner.jar ./backend.jar
CMD ["java", "-jar", "backend.jar"]
