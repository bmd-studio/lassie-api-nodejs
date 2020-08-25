'use strict'

const BaseModule = require('../BaseModule')
    , Account = require('./Person/Account')
    , Event = require('./Person/Event')
    , API = require('./Person/API')

class Person extends BaseModule {

  /**
   * Lassie.PersonAccount => Lassie.Person.Account
   */
  static get Account () {    
    return Account
  }

  /**
   * Lassie.PersonEvent => Lassie.Person.Event
   */ 
  static get Event () {    
    return Event
  }

  /**
   * Lassie.PersonAPI => Lassie.Person.API
   */ 
  static get API () {    
    return API
  }

}

module.exports = Person
