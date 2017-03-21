
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
  host = host.replace(/https:\/\//g, '');
  host = host.replace(/http:\/\//g, '');

  // prepare the host to be valid
  this.baseUrl = this.HTTP_PROTOCOL +'://'+ host +'/api/';
  this.apiKey = apiKey;
  this.apiSecret = apiSecret;
};

/**
 * Perform a model request
 */
LassieApi.prototype.model = function(name, method, arguments, resultCallback) {

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
  this.get('model', parameters, resultCallback);
};

/**
 * Perform a GET request
 */
LassieApi.prototype.get = function(uri, parameters, resultCallback) {

  // variables
  var apiHashContent = this.generateHashContent();
  var apiHash = this.generateBase64Hash(this.apiKey +':'+ apiHashContent);

  // expand the parameters with the key and hash
  parameters.api_key = this.apiKey;
  parameters.api_hash_content = apiHashContent;
  parameters.api_hash = apiHash;

  // debug
  //console.log(apiHashContent);
  //console.log(apiHash);

  // prepare request properties
  var options = {
    method: 'GET',
    url: url.resolve(this.baseUrl, uri),
    qs: parameters,
  };

  // perform the request
  request(options, function(error, response, body) {

      // debug
      console.log('RESPONSE: ');
      console.log(body);
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
