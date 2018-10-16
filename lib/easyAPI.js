const isEmpty = require('objects-made-easy').isEmpty;
const stringify = require('query-string').stringify;
const axios = require('axios');

const defaultAPIVersion = 'v43.0';

module.exports = (orgURL, version) => {
  if (isEmpty(version)) version = defaultAPIVersion;
  if (isEmpty(orgURL)) {
    throw new Error('Organization URL must be set prior to usage');
  }

  const apiURL=`${orgURL}/services/data/${version}`;

  return (token) => {
    if (isEmpty(token)) {
      throw new Error('token must be set prior to usage');
    }
    const headers= {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    };
    return {
      SOQL: (query)=>{
        const url = `${apiURL}/query/?`+stringify({q: query});
        return axios.get(url, {headers});
      },
      SOSL: (query)=>{
        const url = `${apiURL}/search/?`+stringify({q: query});
        return axios.get(url, {headers});
      },
    };
  };
};
