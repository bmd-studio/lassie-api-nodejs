
// import dependencies
var request = require('request');
var crypto = require('crypto');
var url = require('url');

/**
 * Constructor of the Lassie Api Class
 * Please note that this class is still in progress and only supports the model GET request
 * of the Model API as described in api-docs.lassie.cloud.
 */
var LassieApi = function(host, apiKey, apiSecret) {

  // set constants
  this.HTTP_PROTOCOL = 'https';

  // remove possible protocol and path indicators already passed
  host = host.replace('/api', '');
  host = host.replace(/https:\/\//g, '');
  host = host.replace(/http:\/\//g, '');
  host = host.replace(/\/$/, '');

  // prepare the host to be valid
  this.host = host;
  this.baseUrl = this.HTTP_PROTOCOL +'://'+ host +'/api/';
  this.apiKey = apiKey;
  this.apiSecret = apiSecret;
};

/**-----------------------------------------------------------------------------------------------------------**/
/**                                                 MODEL API                                                 **/
/**-----------------------------------------------------------------------------------------------------------**/

/**
 * Perform a model request
 */
LassieApi.prototype.getModel = function(name, method, arguments, resultCallback) {

  // construct the parameters object
  var parameters = {
    name : name,
    method : method,
  };

  // add each argument
  for (var argumentIndex in arguments) {
    parameters[argumentIndex] = arguments[argumentIndex];
  }

  // perform request
  this.get('model', parameters, function(error, response, body) {

    // only return the body
    resultCallback(body);
  });
};

/**-----------------------------------------------------------------------------------------------------------**/
/**                                              PERSON AUTH API                                              **/
/**-----------------------------------------------------------------------------------------------------------**/

/**
 * Get a LassieApi instance of a specific login account
 */
LassieApi.prototype.getPersonApi = function(username, password, resultCallback) {

  // construct the parameters object
  var thisObject = this;
  var parameters = {
    username : username,
    password : password,
  };

  // perform request
  this.post('person_create_api', parameters, function(error, response, body) {

    // guard: check if the body is valid
    if (typeof body !== 'object') {

      // return empty object
      resultCallback(null);
      return;
    }

    // variables
    var personApi = new LassieApi(
      thisObject.getHost(),
      body.api_key,
      body.api_secret
    );

    // return the person API
    resultCallback(personApi);
  });
};

/**
 * Check whether we can authenticate with certain credentials
 */
LassieApi.prototype.authenticate = function(username, password, resultCallback) {

  // construct the parameters object
  var thisObject = this;
  var parameters = {
    username : username,
    password : password,
  };

  // perform request
  this.post('person_authenticate', parameters, function(error, response, body) {

    // guard: check if the body is valid
    if (typeof body !== 'object') {

      // return empty object
      resultCallback(false);
      return;
    }

    // return the person API
    resultCallback(body.status);
  });
};

/**-----------------------------------------------------------------------------------------------------------**/
/**                                                 PERSON API                                                **/
/**-----------------------------------------------------------------------------------------------------------**/

/**
 * Get a list of the latest payments done by a person
 */
LassieApi.prototype.getPersonPayments = function(resultCallback) {

  // construct the parameters object
  var thisObject = this;
  var parameters = {};

  // perform request
  this.get('person_payments', parameters, function(error, response, body) {
    resultCallback(body);
  });
};

/**
 * Get the personal information of a person
 */
LassieApi.prototype.getPersonInformation = function(resultCallback) {

  // construct the parameters object
  var thisObject = this;
  var parameters = {};

  // perform request
  this.get('person_information', parameters, function(error, response, body) {
    resultCallback(body);
  });
};

/**-----------------------------------------------------------------------------------------------------------**/
/**                                               TRANSACTION API                                             **/
/**-----------------------------------------------------------------------------------------------------------**/

/**
 * Get the first account of a person
 */
LassieApi.prototype.getFirstAccount = function(accountId, resultCallback) {
  return this.getAccount('first_balance', accountId, resultCallback);
};

/**
 * Get the second account of a person
 */
LassieApi.prototype.getSecondAccount = function(accountId, resultCallback) {
  return this.getAccount('second_balance', accountId, resultCallback);
};

/**
 * Get a general account
 */
LassieApi.prototype.getSecondAccount = function(accountId, resultCallback) {
  return this.getAccount('general_balance', accountId, resultCallback);
};

/**
 * Get a specific account
 */
LassieApi.prototype.getAccount = function(accountName, accountId, resultCallback) {

  // construct the parameters object
  var thisObject = this;
  var parameters = {
    transaction_account_name : accountName,
    transaction_account_id : accountId,
  };

  // perform request
  this.get('transaction_account', parameters, function(error, response, body) {
    resultCallback(body);
  });
};

/**
 * Get all the categories of the transaction module
 */
LassieApi.prototype.getProductCategories = function(resultCallback) {

  // construct the parameters object
  var thisObject = this;
  var parameters = {};

  // perform request
  this.get('transaction_product_categories', parameters, function(error, response, body) {
    resultCallback(body);
  });
};

/**
 * Get all the products that are public
 */
LassieApi.prototype.getProducts = function(resultCallback) {

  // construct the parameters object
  var thisObject = this;
  var parameters = {};

  // perform request
  this.get('transaction_products', parameters, function(error, response, body) {
    resultCallback(body);
  });
};

/**
 * Get all the transaction types of the transaction module (e.g. cash / pin)
 */
LassieApi.prototype.getTransactionTypes = function(resultCallback) {

  // construct the parameters object
  var thisObject = this;
  var parameters = {};

  // perform request
  this.get('transaction_types', parameters, function(error, response, body) {
    resultCallback(body);
  });
};

/**
 * Get a specific transaction by the request ID you have generated to identify the transaction
 * NOTE: this is an array of transactions, because there can be multiple products
 */
LassieApi.prototype.getTransaction = function(requestId, resultCallback) {

  // construct the parameters object
  var thisObject = this;
  var parameters = {
    request_id : requestId,
  };

  // perform request
  this.get('transaction', parameters, function(error, response, body) {
    resultCallback(body);
  });
};

/**-----------------------------------------------------------------------------------------------------------**/
/**                                                  GETTERS                                                  **/
/**-----------------------------------------------------------------------------------------------------------**/

/**
 * Get the host where the requests are pointing towards
 */
LassieApi.prototype.getHost = function() {
  return this.host;
};

/**
 * Get the base url
 */
LassieApi.prototype.getBaseUrl = function() {
  return this.baseUrl;
};

/**
 * Get the API key
 */
LassieApi.prototype.getApiKey = function() {
  return this.apiKey;
};

/**
 * Get the API secret
 */
LassieApi.prototype.getApiSecret = function() {
  return this.apiSecret;
};

/**-----------------------------------------------------------------------------------------------------------**/
/**                                                  HELPERS                                                  **/
/**-----------------------------------------------------------------------------------------------------------**/

/**
 * Perform a GET request
 */
LassieApi.prototype.get = function(uri, parameters, resultCallback) {
  return this.performRequest(uri, 'GET', parameters, resultCallback)
};

/**
 * Perform a POST request
 */
LassieApi.prototype.post = function(uri, parameters, resultCallback) {
  return this.performRequest(uri, 'POST', parameters, resultCallback)
};

/**
 * Perform a request
 */
LassieApi.prototype.performRequest = function(uri, method, parameters, resultCallback) {

  // variables
  var apiHashContent = this.generateHashContent();
  var apiHash = this.generateBase64Hash(this.apiKey +':'+ apiHashContent);

  // expand the parameters with the key and hash
  parameters.api_key = this.apiKey;
  parameters.api_hash_content = apiHashContent;
  parameters.api_hash = apiHash;

  // convert the method variable to uppercase to prevent any mistakes when comparing
  method = method.toUpperCase();

  // prepare request properties
  var options = {
    method: method,
    url: url.resolve(this.baseUrl, uri),
  };

  // check for post
  if (method === 'POST') {
    options.form = parameters;
  } else if (method === 'GET') {
    options.qs = parameters;
  } else {

    // debug
    console.log('The following method is not supported by the LassieApi: '+ method);

    // exit at once
    resultCallback('Invalid method used when requesting', null, null);
    return;
  }

  // perform the request
  request(options, function(error, response, body) {

    // attempt to parse the body
    try {
      body = JSON.parse(body);
    } catch (error) {
      // ignore
    }

    // execute the callback
    resultCallback(error, response, body);
  });
};

/**
 * Create base 64 hash
 */
LassieApi.prototype.generateBase64Hash = function(content) {

  // variables
  var hash = crypto.createHmac('sha256', this.apiSecret).update(content).digest('hex');

  return new Buffer(hash).toString('base64');
}

/**
 * Generate random piece of content used for the hashing
 */
LassieApi.prototype.generateHashContent = function() {

  // variables
  var date = new Date();
  var millis = date.getTime();
  var random = parseInt(Math.random() * 1000000);

  return String(millis) + String(random);
};

// publish to other classes
module.exports = LassieApi;
