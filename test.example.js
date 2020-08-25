const Lassie = require('.')

const processResponse = (err, res) => {
  if (err) return console.log(err.message, err.response.data)
  console.log(res.data)
}

// const ManagementInstance = new Lassie.Instance(
//   'https://demo.lassie.cloud/api/v2',
//   'f15d520e79a76d034a480397cc3e3f89',
//   'c8b91a5c9d360693507abf8e9675be70',
//   true
// )
// ManagementInstance.validate(valid => console.log('Validity:', valid))

// Lassie.App.getKey({
//   api_host: 'https://demo.lassie.cloud/api/v2',
//   auth_token: ''
// }, processResponse)

// Lassie.Management.Person.create(ManagementInstance, {}, processResponse)

// const ModelInstance = new Lassie.Instance(
//   'https://demo.lassie.cloud/api/v2',
//   '208d8278e794ab4477c26ca7dfa0c1cf',
//   '3c7ce7c4311a47cf4392a215a02ab2ca',
//   true
// )
// ModelInstance.validate(valid => console.log('Validity:', valid))

// Lassie.Model.TransactionModel.getNewGenerationTransactions(ModelInstance, { 
//   module_name: 'bar',
//   last_transaction_id: 10
// }, processResponse)

// const AuthInstance = new Lassie.Instance(
//   'https://demo.lassie.cloud/api/v2',
//   '8c88597e5f115573d67c06ed2d03c79a',
//   'f039ea1fd94263df6e97a94c6a10deb8',
//   true
// )

// Lassie.PersonAuth.getPerson(AuthInstance, { username: 'admin', password: 'adminadmin' }, (err, personInstance) => {
//   Lassie.Person.Account.accept(personInstance, processResponse)
//   Lassie.Person.Events.pay(personInstance, processResponse)
//   Lassie.Person.getPayments(personInstance, processResponse)
// })

// const TransactionInstance = new Lassie.Instance(
//   'https://demo.lassie.cloud/api/v2',
//   '08bd4ea9273a4c1fb4c0ce37712421ff',
//   '34ef9b72f4d22a0b3849c1c2464fcacc',
//   true
// )
// Lassie.Transaction.getTransaction(TransactionInstance, {}, processResponse)

// const LassieAdmin = new Lassie.Instance(
//   'https://demo.lassie.cloud/api/v2',
//   'c00eb08826a18a43f5b2f0e48e9a2277',
//   '57f9cde3ff7a3dc1c40b5de24644eae0',
//   true
// )
// Lassie.Person.getPayments(LassieAdmin, processResponse)
// Lassie.Person.getGroups(LassieAdmin, processResponse)
// Lassie.Person.Account.accept(LassieAdmin, processResponse)
