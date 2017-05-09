
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
  'http://demo.lassie.cloud/', // host
  'a4a072d4205429033b1ff950ac5e8e2b', // public key
  '1560f4b1d81a0fdd3c60698102559bac' // secret key
);

modelApi.getModel(
  'transaction_model', // get from the transaction model class
  'get_new_generation_transactions', // execute this method
  {
    module_name : 'bar', // the 'module_name' argument in the method should be bar
    last_transaction_id : 321, // the 'last_transaction_id' should be your last known indexed transaction
  },
  function(data) {

    // debug
    //console.log(data);
  }
);

/**-----------------------------------------------------------------------------------------------------------**/
/**                                        PERSON AUTH & PERSON EXAMPLE                                       **/
/**-----------------------------------------------------------------------------------------------------------**/

// instantiate a new Lassie API with model rights
var personAuthApi = new LassieApi(
  'http://demo.lassie.cloud/', // host
  '360bb21cd2783439017ddd3f9fed227f', // public key
  '5fd280ee7192797bd66025a0bde4fbad' // secret key
);

personAuthApi.getPersonApi(
  'admin',
  'adminadmin',
  function(personApi) {

    // debug
    //console.log(personApi);

    // now we have a person Api we can get personal information
    personApi.getPersonPayments(function(payments) {

      // debug
      //console.log('PAYMENTS:');
      //console.log(payments);
    });
    personApi.getPersonInformation(function(information) {

      // debug
      //console.log('INFORMATION:');
      //console.log(information);
    });
  }
);

personAuthApi.authenticate(
  'admin',
  'adminadmin',
  function(isValidLogin) {

    // debug
    //console.log('Is a valid login: '+ isValidLogin);
  }
);

/**-----------------------------------------------------------------------------------------------------------**/
/**                                            TRANSACTION EXAMPLE                                            **/
/**-----------------------------------------------------------------------------------------------------------**/

// instantiate a new Lassie API with model rights
var barTransactionApi = new LassieApi(
  'http://demo.lassie.cloud/', // host
  'f25a0189fc3ec21d131d22f78230ef71', // public key
  '86fcbf20170cca40ad2707c513955ec5' // secret key
);

barTransactionApi.getFirstAccount('ssssssssss', function(account) {

    // debug
    //console.log(account);
  }
);

barTransactionApi.getProductCategories(function(categories) {

    // debug
    console.log(categories);
  }
);
