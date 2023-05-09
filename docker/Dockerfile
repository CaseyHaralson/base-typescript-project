FROM node:18.6.0-bullseye-slim AS base
RUN apt-get update && apt-get install -y --no-install-recommends dumb-init
WORKDIR /project
COPY package*.json /project
RUN npm ci
COPY . /project
RUN npm run build

FROM base AS clean
RUN npm prune --production \
    && rm -r src \
    && rm tsconfig.json \
    && rm tsconfig.tsbuildinfo

FROM node:18.6.0-bullseye-slim AS prod
COPY --chown=node:node --from=base /usr/bin/dumb-init /usr/bin/dumb-init
ENV NODE_ENV production
USER node
WORKDIR /project
COPY --chown=node:node --from=clean /project /project
CMD ["dumb-init", "node", "."]

# wait forever so you can inspect the container
# CMD ["tail", "-f", "/dev/null"] 