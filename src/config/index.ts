import dotenv from 'dotenv';

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();
if (envFound.error) {
  throw new Error('Could not find the .env file');
}

export const nodeEnv = process.env.NODE_ENV;
export const port = parseInt(`${process.env.PORT}`, 10) || 3000;

export const jwtSecret = process.env.JWT_SECRET;
export const jwtAlgorithm = process.env.JWT_ALGO;

export const logLevel = 'info';

export const apiPrefix = '/api';

export const emailer = {
  username: process.env.EMAIL_USER,
  password: process.env.EMAIL_PASS,
  secret: process.env.EMAIL_SECRET
};

//DATABASE stuff
