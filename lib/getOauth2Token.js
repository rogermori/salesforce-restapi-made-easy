const {post} = require('axios');
const {stringify} = require('querystring');
const {StandardResponse, AxiosErrorHandler} = require('api-made-easy');
const {project, isEmpty} = require('objects-made-easy');
const {messageErrorHandler} = AxiosErrorHandler;

module.exports = async function({client_id, client_secret, username,
  passwordAndToken}, tokenUrl) {
  try {
    const Credentials = {grant_type: 'password', client_id, client_secret,
      username, password: passwordAndToken};
    const response = await post(
        tokenUrl,
        stringify(Credentials),
        {headers: _headers()});
    const {access_token, instance_url} = project(response, 'data', {});
    if (isEmpty(access_token)) {
      return _errorResponse('empty token', [...arguments]);
    }
    return _successResponse({access_token, instance_url});
  } catch (error) {
    const message = messageErrorHandler(error);
    return _errorResponse(message, [...arguments]);
  }
};

function _headers() {
  return {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Cache-Control': 'no-cache',
  };
}

const _errorResponse = (errorMessage, request) => {
  return new StandardResponse(false, errorMessage, request, {}, true).getResponse();
};

const _successResponse = (newQuoteResponse, request) =>{
  return new StandardResponse(true, 'All good', request, newQuoteResponse, true).getResponse();
};


