
/**-----------------------------------------------------------------------------------------------------------**/
/**                                                INITIALIZE                                                 **/
/**-----------------------------------------------------------------------------------------------------------**/

// import dependencies
var LassieApi = require('./LassieApi');

/**-----------------------------------------------------------------------------------------------------------**/
/**                                               MODEL EXAMPLE                                               **/
/**-----------------------------------------------------------------------------------------------------------**/

// instantiate a new Lassie API with model rights
var modelApi = new LassieApi(
  'demo.lassie.cloud', // host
  'a4a072d4205429033b1ff950ac5e8e2b', // public key
  '1560f4b1d81a0fdd3c60698102559bac' // secret key
);

modelApi.model(
  'transaction_model', // get from the transaction model class
  'get_new_generation_transactions', // execute this method
  {
    module_name : 'bar', // the 'module_name' argument in the method should be bar
    last_transaction_id : '19', // the 'last_transaction_id' should be your last known indexed transaction
  },
  function(data) {
    console.log(data); // debug the received data
  }
);
