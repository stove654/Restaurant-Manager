'use strict';

/**
 * @ngdoc function
 * @name restaurantManagerApp.config:APP_CONFIG
 * @description
 * # APP_CONFIG
 * Controller of the restaurantManagerApp
 */
angular.module('restaurantManagerApp')
  .constant('APP_CONFIG', {
    baseUrl: 'http://localhost:8080/api/'
  });