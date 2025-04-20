# Stage 1: Build backend (Spring Boot)
FROM maven:3.8.5-openjdk-17 AS backend-build
WORKDIR /app/backend
COPY backend/pom.xml .
COPY backend/src ./src
RUN mvn clean package -DskipTests

# Stage 2: Build frontend (React)
FROM node:18 AS frontend-build
WORKDIR /app/frontend
COPY frontend/package.json .
COPY frontend/package-lock.json .
RUN npm install
COPY frontend/ .
RUN npm run build

# Stage 3: Create final image with Nginx and backend
FROM openjdk:17-jdk-slim AS final-stage
WORKDIR /app

# Copy backend JAR
COPY --from=backend-build /app/backend/target/coffeeshop-backend-0.0.1-SNAPSHOT.jar backend.jar

# Copy frontend build output
COPY --from=frontend-build /app/frontend/build/ ./frontend/

# Install Nginx
RUN apt-get update && apt-get install -y nginx

# Configure Nginx to serve frontend and proxy to backend
COPY nginx.conf /etc/nginx/nginx.conf

# Expose ports (80 for Nginx, 8080 for backend)
EXPOSE 80
EXPOSE 8080

# Start Nginx and backend
CMD ["sh", "-c", "java -jar backend.jar & nginx -g 'daemon off;'"]