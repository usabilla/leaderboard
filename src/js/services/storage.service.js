var PouchDB = require('pouchdb');
var _assign = require('lodash/assign');

/*@ngInject*/
function StorageService () {
  var objects = new PouchDB('Games');

  /**
   * Save the new object in storage.
   * @param object
   * @returns {object|undefined}
   */
  function save (object) {
    return objects.put(object)
      .then(function (response) {
        return response;
      }).then(function (err) {
        throw new Error(err);
      });
  }

  /**
   * Get all objects from storage.
   * @returns {Object[]}
   */
  function getAll () {
    return objects
      .allDocs({include_docs: true})
      .then(function (docs) {
        return docs.rows;
      });
  }

  /**
   * Update the document with id and data.
   * @param {string} id
   * @param {Object} data
   */
  function update (id, data) {
    return objects
      .get(id)
      .then(function (doc) {
        _assign(doc, data);
        return objects.put(doc);
      });
  }

  return {
    getAll: getAll,
    save: save,
    update: update
  };
}

module.exports = StorageService;
