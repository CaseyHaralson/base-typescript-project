# starter-typescript-project

To get started locally, run the following commands from the project root directory:

```
npm install
npm run build
npm run start
```

You can also run the build and files in watch mode, but each command will need to be run in its own shell:
```
npm run build:watch

npm run start:watch
```

Installing new packages (and just for a dev dependency):

```
npm install [package]

npm install [package] -D
```

Updating the package.json to the newest dependency versions and updating the package-lock.json file requires a few steps:

1. `npx npm-check-updates -u` to update the package.json with the most up-to-date versions
2. `npm install` to install the updated packages from the last step
3. `npm update` cleans up the install

[//]: # (.pinkyring=DOCKER)

## Docker

[^1]

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

And add a health monitoring endpoint.

[//]: # (.pinkyring=DOCKER.end)

## Infrastructure

A [docker-compose.infra.yml](./devops/docker-compose.infra.yml) file has been added that can be used to add any docker services (databases, caches, etc) that are needed during development.

The infrastructure can be run and shutdown with the following commands:
```
npm run infra

npm run infra:stop
```

[//]: # (.pinkyring=POSTGRES)

### Relational DB

[^1]

Postgres has been added as the relational database, and [TypeORM](https://typeorm.io/) has been added as the ORM.
[pgAdmin](https://www.pgadmin.org/) has also been added that runs with the infrastructure (user: admin@admin.com, password: root).

The database entities live in the [entities folder](./src/entities/) and seed data can be generated by creating a factory and seeder in the [seed folder](./src/relationalDB/seed/).

The configuration for the database is done in the [config.ts file](./src/relationalDB/config.ts).
The following environment variable configurations can be set (or these defaults can be used during development):

```
PGUSER      = postgres
PGPASSWORD  = postgres
PGHOST      = localhost
PGPORT      = 5432
PGDATABASE  = db

PGHOST_CA_CERT
PGCLIENT_KEY
PGCLIENT_CERT
```

Several npm scripts have been created to help with database tasks (run like `npm run db:create`):

- `db:create` to create the database initially
- `db:seed` to seed the database with some initial data
- `db:migration:generate` to generate a database migration. This is used differently than the other commands. Run like: `npm run db:migration:generate --name=[migration-name]`
- `db:migration:run` to update the database schema
- `db:drop` to drop the database. Use with caution, obviously.

To connect to the database and start using TypeORM:

```
import {AppDataSource, waitForRelationalDatabaseConnection} from './relationalDB/appDataSource';
import {DemoEntity} from './entities/demoEntity';

// wait for the database connection to be ready
await waitForRelationalDatabaseConnection();

// start using the connection
const allDemoEntities = await AppDataSource.getRepository(DemoEntity).find();
```

[//]: # (.pinkyring=POSTGRES.end)

[//]: # (.pinkyring=MONGO)

### Document DB

[^1]

Mongo has been added as the document database.
[mongo-express](https://github.com/mongo-express/mongo-express) has also been added that runs with the infrastructure (user: admin, password: pass).

The configuration for the database is done in the [config.ts file](./src/documentDB/config.ts).
The following environment variable configurations can be set (or these defaults can be used during development):

```
MONGO_USER      = mongo
MONGO_PASSWORD  = mongo
MONGO_HOST      = localhost
MONGO_PORT      = 27017
```

To connect to the database and start using Mongo:

```
import {DocumentClient, waitForDocumentDatabaseConnection} from './documentDB/documentClient';

// wait for the database connection to be ready
await waitForDocumentDatabaseConnection();

// start using the connection
await DocumentClient.db('db').collection('test').insertOne({hello: 'world'});
```

[//]: # (.pinkyring=MONGO.end)

[//]: # (.pinkyring=REDIS)

### Redis

[^1]

Redis has been added as an in-memory data store and cache.

The configuration for redis is done in the [config.ts file](./src/cache/config.ts).
The following environment variable configurations can be set (or these defaults can be used during development):

```
REDIS_HOST    = localhost
REDIS_PORT    = 6379

REDIS_AUTH_PASS
REDIS_HOST_CERT
```

To connect to the cache and start using Redis:

```
import {Cache, waitForCacheConnection} from './cache/cache';

// wait for the cache connection to be ready
await waitForCacheConnection();

// start using the connection
const cache = Cache;
await cache.set('key', 'value');
const value = cache.get('key');
```

[//]: # (.pinkyring=REDIS.end)

[^1]: This functionality is removable with [pinkyring](https://www.npmjs.com/package/pinkyring)
