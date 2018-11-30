const {escapeSOQL, escapeSOSL, createSearchCriteria} = require('./lib/QLnSL');
const easyAPI = require('./lib/easyAPI');
const getOAuth2Token = require('./lib/getOAuth2Token');

module.exports = {
  escapeSOQL,
  escapeSOSL,
  createSearchCriteria,
  easyAPI,
  getOAuth2Token,
};

