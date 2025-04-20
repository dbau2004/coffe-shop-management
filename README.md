Coffee Shop Management

A simple coffee shop management application with a Spring Boot backend and React frontend.

Project Structure

backend/: Spring Boot backend.

frontend/: React frontend.

docker-compose.yml: Docker Compose configuration.

Prerequisites

Docker

Docker Compose

Java 17 (for backend development)

Node.js 18 (for frontend development)

Setup

Clone the repository:

git clone <https://github.com/dbau2004/coffe-shop-management.git>
cd coffee-shop-management

Build and run the application with Docker Compose:

docker-compose up --build

Access the frontend at:

http://localhost:3000

Access the backend API at:

http://localhost:8080

Default Credentials

Admin user: root / rootpassword (role: ROOT_ADMIN)

Features

Register new users.

Admin can manage users (create, view, update roles).

Manage tables (create, view).
