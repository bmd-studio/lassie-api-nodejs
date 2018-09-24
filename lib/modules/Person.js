'use strict'

const BaseModule = require('../BaseModule')
    , Account = require('./Person/Account')
    , Events = require('./Person/Events')
    , API = require('./Person/API')

class Person extends BaseModule {

  /**
   * Lassie.PersonAccount => Lassie.Person.Account
   */
  static get Account () {    
    return Account
  }

  /**
   * Lassie.PersonEvents => Lassie.Person.Events
   */ 
  static get Events () {    
    return Events
  }

  /**
   * Lassie.PersonAPI => Lassie.Person.API
   */ 
  static get API () {    
    return API
  }

}

module.exports = Person
