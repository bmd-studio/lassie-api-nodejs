'use strict'

const BaseModule = require('../../BaseModule')

class Events extends BaseModule {

  // custom endpoint
  get opts () {
    return {
      endpoint: 'person/event'
    }
  }

}

module.exports = Events
