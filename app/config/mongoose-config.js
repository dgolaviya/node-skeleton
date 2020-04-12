'use strict';
import mongoose from 'mongoose';
import debug from "debug";
import dotenv from 'dotenv'

const logger = debug('user-auth-app:mongoose-connection-setup');
dotenv.config();

const DB_OPTIONS = {
  autoIndex: process.env.DB_AUTO_INDEX, // Don't build indexes
  reconnectTries: process.env.DB_RECONNECT_TRIES, // Never stop trying to reconnect
  reconnectInterval: process.env.DB_RECONNECT_INTERVAL, // Reconnect every 500ms
  poolSize: process.env.DB_POOLSIZE,
  minSize: process.env.DB_MIN_SIZE, //f present, the connection pool will be initialized with minSize connections, and will never dip below minSize connections
  socketTimeoutMS: process.env.DB_SOCKET_TIMEOUT_MS,
  loggerLevel: process.env.DB_LOGGER_LEVEL,
  keepAlive: process.env.DB_KEEP_ALIVE,
  bufferMaxEntries: process.env.DB_BUFFER_MAX_ENTRIES,
  useNewUrlParser: true,
  useUnifiedTopology: true
}

const connectMongooseDB = () => {
  logger('Connecting via mongoose....... %O', process.env.DB_URI)
  mongoose.connect(process.env.DB_URI, DB_OPTIONS);

  mongoose.connection.on('connected', () => {
    logger('Mongoose default connection is open  ', process.env.DB_URI);
  });

  mongoose.connection.on('error', (err) => {
    logger('Mongoose default connection has occured ' + err + ' error');
  });

  mongoose.connection.on('disconnected', () => {
    logger('Mongoose default connection is disconnected');
  }
  );

  process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      logger('Mongoose default connection is disconnected due to application termination');
      process.exit(0)
    });
  });
  process.on('SIGTERM', () => {
    mongoose.connection.close(() => {
      logger('Mongoose default connection is disconnected due to application termination');
      process.exit(0)
    });
  });
  return mongoose;
};

export default connectMongooseDB;