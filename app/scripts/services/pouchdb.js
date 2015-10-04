'use strict';

/**
 * @ngdoc service
 * @name restaurantManagerApp.pouchdb
 * @description
 * # pouchdb
 * Factory in the restaurantManagerApp.
 */
angular.module('restaurantManagerApp')
  .factory('pouchdb', function () {

    return new PouchDB('restaurantManagerApp');
  });
