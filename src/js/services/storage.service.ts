var PouchDB = require('pouchdb');
var _assign = require('lodash/assign');

export class StorageService {
  private objects = new PouchDB('Games');

  /**
   * Save the new object in storage.
   * @param object
   * @returns {object|undefined}
   */
  save (object) {
    return this.objects.put(object)
      .then((response) => {
        return response;
      }).then((err) => {
        throw new Error(err);
      });
  }

  /**
   * Get all objects from storage.
   * @returns {Object[]}
   */
  getAll () {
    return this.objects
      .allDocs({include_docs: true})
      .then((docs) => {
        return docs.rows;
      });
  }

  /**
   * Update the document with id and data.
   * @param {string} id
   * @param {Object} data
   */
  update (id, data) {
    return this.objects
      .get(id)
      .then((doc) => {
        _assign(doc, data);
        return this.objects.put(doc);
      });
  }
}
