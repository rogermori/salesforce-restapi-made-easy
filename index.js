const {escapeSOQL, escapeSOSL, createSearchCriteria} = require('./lib/QLnSL');
const easyAPI = require('./lib/easyAPI');
const getAuth2Token = require('./lib/getOauth2Token');

module.exports = {
  escapeSOQL,
  escapeSOSL,
  createSearchCriteria,
  easyAPI,
  getAuth2Token,
};

