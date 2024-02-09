import {MongoClient, MongoClientOptions} from 'mongodb';

const user = process.env.MONGO_USER || 'root';
const pass = process.env.MONGO_PASSWORD || 'example';
const host = process.env.MONGO_HOST || 'localhost';
const port = parseInt(process.env.MONGO_PORT || '27017');
const db = process.env.MONGO_DB || 'db';
const url = `mongodb://${user}:${pass}@${host}:${port}/${db}`;

const options: MongoClientOptions = {};

export const client = new MongoClient(url, options);
