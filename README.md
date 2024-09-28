# Logs-Monitoring

- [Description](#description)
- [Requirements](#requirements)
- [Quick Start](#quick-start)
- [Languages and Tools](#languages-and-tools)
- [Services](#services)

## Description

This project is a simple example of how to store logs in centralized logging service in a microservices architecture. The logs-service is responsible for storing logs in the database (elasticsearch) and the publisher-service is responsible for publishing logs to RabbitMQ.

## Requirements

> Docker

## Quick Start

```bash
# Clone this repository
git clone https://github.com/Adosh74/logs-monitoring.git

# Go into the repository
cd logs-monitoring

# Build images and start containers
docker-compose up --build
```

## Languages and Tools

- Node.js
- TypeScript
- Express
- Elasticsearch
- RabbitMQ

## Services

- [Logs-Service](logs-service/README.md)
- [Publisher-Service](publisher-service/README.md)
