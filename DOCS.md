# API Instance

```
const instance = new Lassie.Instance(api_host, api_key, api_secret)
```

`instance.validate( cb(isValidInstance?) )`

# Lassie App

`Lassie.App.getKey({ api_host, auth_token }, cb(err, res))`

# Model
_Requires Model API keys_

`Lassie.Model.<ModelName>Model.<MethodName>(instance, { params }, cb(err, res))`

See [model-docs.lassie.cloud](https://model-docs.lassie.cloud/) for model and method names.

# Person Auth
_Requires Person Auth API keys_

- `Lassie.PersonAuth.create(instance, { params }, cb(err, res))`
- `Lassie.PersonAuth.reset(instance, { params }, cb(err, res))`
- `Lassie.PersonAuth.check(instance, { params }, cb(err, res))`

- `Lassie.PersonAuth.getPerson(instance, { username, password }, cb(personInstance))`

Note: this is a helper function; the callback returns a `Lassie.Instance` object with the Person API keys.

# Person
_Requires Person API keys (valid Instance object can be retrieved using `Lassie.PersonAuth.getPerson`)_

- `Lassie.Person.getGroups(instance, { params }, cb(err, res))`
- `Lassie.Person.getPayments(instance, { params }, cb(err, res))`
- `Lassie.Person.getInformation(instance, { params }, cb(err, res))`
- `Lassie.Person.update(instance, { params }, cb(err, res))`

- `Lassie.Person.Account.create(instance, { params }, cb(err, res))`
- `Lassie.Person.Account.deactivate(instance, { params }, cb(err, res))`
- `Lassie.Person.Account.invite(instance, { params }, cb(err, res))`
- `Lassie.Person.Account.accept(instance, { params }, cb(err, res))`
- `Lassie.Person.Account.revoke(instance, { params }, cb(err, res))`
- `Lassie.Person.Account.select(instance, { params }, cb(err, res))`
- `Lassie.Person.Account.transfer(instance, { params }, cb(err, res))`
- `Lassie.Person.Account.upgrade(instance, { params }, cb(err, res))`

- `Lassie.Person.Events.pay(instance, { params }, cb(err, res))`

- `Lassie.Person.API.revoke(instance, { params }, cb(err, res))`

# Person Management
_Requires Person Management API keys_

- `Lassie.Management.Person.create(instance, { params }, cb(err, res))`
- `Lassie.Management.Person.update(instance, { params }, cb(err, res))`

# Transaction
_Requires Transaction API keys_

- `Lassie.Transaction.getTransaction(instance, { params }, cb(err, res))`
- `Lassie.Transaction.postTransaction(instance, { params }, cb(err, res))`

- `Lassie.Transaction.getAccount(instance, { params }, cb(err, res))`
- `Lassie.Transaction.getProductCategories(instance, { params }, cb(err, res))`
- `Lassie.Transaction.getProducts(instance, { params }, cb(err, res))`
- `Lassie.Transaction.getTransactionTypes(instance, { params }, cb(err, res))`

Note: `transaction/account/upgrade` is a shorthand and will not be implemented.