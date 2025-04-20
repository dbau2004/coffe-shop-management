Coffee Shop Management
A simple coffee shop management application with a Spring Boot backend and React frontend.
Project Structure

backend/: Spring Boot backend.
frontend/: React frontend.
Dockerfile: Dockerfile to build the entire application.
docker-compose.yml: Docker Compose configuration.

Prerequisites

Docker
Docker Compose

Setup

Clone the repository:
git clone https://github.com/your-username/coffee-shop-management.git
cd coffee-shop-management

Build and run the application with Docker Compose:
docker-compose up --build

Access the application at:
http://localhost

Access the backend API directly (if needed) at:
http://localhost:8080

Default Credentials

Admin user: root / rootpassword (role: ROOT_ADMIN)

Features

Register new users.
Admin can manage users (create, view, update roles).
Manage tables (create, view).
