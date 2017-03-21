const Datastore = require('nedb')

const db = {
  clicks: new Datastore(),
}

exports = module.exports = db
