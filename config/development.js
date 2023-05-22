const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  nodeEnv: process.env.NODE_ENV,
  SERVER: {
    HOST: process.env.HOST || 'localhost',
    PORT: process.env.PORT || 8080,
  },
  ELASTIC_SEARCH: {
    URL: process.env.ELASTICSEARCH_URL || 'ELASTICSEARCH_URL',
    API_KEY: process.env.ELASTICSEARCH_APIKEY || 'ELASTICSEARCH_APIKEY',
    USERNAME: process.env.ELASTICSEARCH_USERNAME || 'ELASTICSEARCH_USERNAME',
    PASSWORD: process.env.ELASTICSEARCH_PASSWORD || 'ELASTICSEARCH_PASSWORD',
  },
};
