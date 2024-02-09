import {MongoClient, MongoClientOptions} from 'mongodb';

const user = process.env.MONGO_USER || 'mongo';
const pass = process.env.MONGO_PASSWORD || 'mongo';
const host = process.env.MONGO_HOST || 'localhost';
const port = parseInt(process.env.MONGO_PORT || '27017');
const url = `mongodb://${user}:${pass}@${host}:${port}/`;

const options: MongoClientOptions = {};

export const client = new MongoClient(url, options);
