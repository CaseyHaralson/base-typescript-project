# starter-typescript-project

To get started locally, run the following commands from the project root directory:

```
npm install
npm run build
npm run start
```

[//]: # (.pinkyring=DOCKER)

## Docker

Run the project in Docker and then later stop the project:
```
npm run docker:build
npm run docker:run

npm run docker:stop
```

### Dockerfile

A [dockerfile](./Dockerfile) has been added that follows the current best practices: 

- https://snyk.io/blog/10-best-practices-to-containerize-nodejs-web-applications-with-docker/
- https://www.docker.com/blog/9-tips-for-containerizing-your-node-js-application/

### Server Best Practices

If you add a server, you will want to use [Graceful Shutdown](https://www.npmjs.com/package/graceful-sd) to handle stopping connections and whatnot gracefully.

You will also probably want to install OpenTelemetry or some sort of telemetry tool: https://opentelemetry.io/docs/instrumentation/js/getting-started/nodejs/

And add health monitoring.

[//]: # (.pinkyring=DOCKER.end)