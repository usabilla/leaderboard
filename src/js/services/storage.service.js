var _findIndex = require('lodash/findIndex');

/*@ngInject*/
function StorageService (localStorageService) {
  var key = 'games';

  var service = {
    getAll: getAll,
    save: save,
    update: update
  };

  /**
   * Save the new object in storage.
   * @param object
   * @returns {object|undefined}
   */
  function save (object) {
    var objects = service.getAll();

    objects.push(object);
    localStorageService.set(key, objects);

    return object;
  }

  /**
   * Get all objects from storage.
   * @returns {Object[]}
   */
  function getAll () {
    return localStorageService.get(key) || [];
  }

  /**
   * Update
   * @param {object} object
   */
  function update (object) {
    var objects = service.getAll();

    var index = _findIndex(objects, function updateFindIndex (_object) {
      return _object.name === object.name;
    });

    if (index === -1) {
      return;
    }

    objects[index] = object;

    localStorageService.set(key, objects);
  }

  return service;
}

module.exports = StorageService;
