# PubSub Microservice Architecture

A microservice system demonstrating PubSub architecture with Node.js, MongoDB, Redis, Docker, and Kubernetes.

## System Architecture

This project consists of two main services:
- **Receiver Service**: Accepts HTTP POST requests with JSON data, validates it, stores it in MongoDB, and publishes events.
- **Listener Service**: Subscribes to events from the receiver service and processes the data.

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Redis (for PubSub)
- Docker
- Kubernetes



# Running the Application
Using Docker Compose

## First, make sure you have all the files in place
Build and start all services:
```bash
docker-compose up --build
```
Using Kubernetes

1. First, build the Docker images:
```bash
docker build -t receiver-service:latest ./receiver-service
docker build -t listener-service:latest ./listener-service
```
2. Apply Kubernetes manifests:
```bash
kubectl apply -f k8s/mongodb-deployment.yaml
kubectl apply -f k8s/redis-deployment.yaml
kubectl apply -f k8s/receiver-deployment.yaml
kubectl apply -f k8s/listener-deployment.yaml
```
3. Check that everything is running:
```bash
kubectl get pods
kubectl get services
```
# Testing the Application
You can test the application with a simple curl command:
```bash
curl -X POST \
  http://localhost:3000/api/receiver \
  -H 'Content-Type: application/json' \
  -H 'X-API-Key: your-secret-api-key' \
  -d '{
    "user": "Harry",
    "class": "Comics",
    "age": 22,
    "email": "harry@potter.com"
  }'
```
## To verify the data was processed:

Check MongoDB collections (if you're running locally):
```bash
# Connect to MongoDB
docker exec -it pubsub-microservice_mongodb_1 mongo

# Use the pubsub database
use pubsub

# Check the first collection (users)
db.users.find().pretty()

# Check the second collection (processedusers)
db.processedusers.find().pretty()
```
