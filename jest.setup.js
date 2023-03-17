// eslint-disable-next-line
require('dotenv').config();

const { EXPO_PUSH_SECURITY } = process.env;

if (!EXPO_PUSH_SECURITY)
  throw new Error('No testing authorization provided in env!');
