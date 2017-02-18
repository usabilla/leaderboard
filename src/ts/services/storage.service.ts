let PouchDB = require('pouchdb');
let _assign = require('lodash/assign');

// TODO: encapsulate all pouchdb implementation details in storage service
export class StorageService {
  private objects = new PouchDB('Games');

  /**
   * Save the new object in storage.
   * @param object
   * @returns {object|undefined}
   */
  save (object) {
    return this.objects.put(object)
      .then(response => {
        return response;
      }).catch(err => {
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
      .then(docs => {
        return docs.rows;
      }).catch(err => {
        throw new Error(err);
      });
  }

  /**
   * Update the document with id and data.
   * @param {string} id
   * @param {Object} data
   */
  update (id, data): angular.IPromise<void> {
    return this.objects
      .get(id)
      .then(doc => {
        _assign(doc, data);
        return this.objects.put(doc);
      }).catch(err => {
        throw new Error(err);
      });
  }

  /**
   * Remove the document with id from the storage.
   * @param id
   * @return {angular.IPromise<void>}
   */
  remove (id): angular.IPromise<void> {
    return this.objects
      .get(id)
      .then(doc => {
        return this.objects.remove(doc);
      }).catch(err => {
        throw new Error(err);
      });
  }
}
