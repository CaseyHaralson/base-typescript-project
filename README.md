# base-typescript-project

To get started locally, run the following commands from the project root directory:

```
npm install
npm run build
npm run start
```

[//]: # (.pinkyring=DOCKER)

## Docker

A docker-compose.yml file has been added that can be used to add any docker services (databases, caches, etc). 
The file is currently set up to build and run the project in production mode.

Run the docker-compose file or run it while building any new Dockerfile changes:
```
docker compose up -d

docker compose up --build -d
```

### Dockerfile

A [dockerfile](./docker/Dockerfile) has been added that follows the current best practices: 

- https://snyk.io/blog/10-best-practices-to-containerize-nodejs-web-applications-with-docker/
- https://www.docker.com/blog/9-tips-for-containerizing-your-node-js-application/

### Best Practices

If you add a server, you will probably want to install "stoppable" and implement graceful shutdown. Refer to the [src/gracefulShutdown.ts](./src/gracefulShutdown.ts) file for a starting point.

You will also probably want to install OpenTelemetry or some sort of telemetry tool: https://opentelemetry.io/docs/instrumentation/js/getting-started/nodejs/

And add health monitoring.

[//]: # (.pinkyring=DOCKER.end)