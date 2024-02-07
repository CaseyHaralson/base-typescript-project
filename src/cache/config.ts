import {
  RedisClientOptions,
  RedisFunctions,
  RedisModules,
  RedisScripts,
} from 'redis';

const host = process.env.REDIS_HOST || 'localhost';
const port = parseInt(process.env.REDIS_PORT || '6379');
const password = process.env.REDIS_AUTH_PASS || '';

const hostCA = process.env.REDIS_HOST_CERT;

const options: RedisClientOptions<RedisModules, RedisFunctions, RedisScripts> =
  {
    socket: {
      host: host,
      port: port,
      tls: hostCA ? true : false,
      ca: hostCA,
    },
    password: password,
  };

export {options as cache_config};
