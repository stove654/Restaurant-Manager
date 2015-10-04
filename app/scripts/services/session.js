'use strict';

/**
 * @ngdoc service
 * @name restaurantManagerApp.session
 * @restaurantManagerApp
 * # session
 * Service in the restaurantManagerApp.
 */
angular.module('restaurantManagerApp')
  .service('SessionService', function (localStorageService, $state) {

    var session = {};

    session.isToken = function () {
      var isLoggedIn = false;
      if (localStorageService.get('user')) {
        var user = localStorageService.get('user');
        if (user.token) {
          isLoggedIn = true;
        }
      }
      return {
        isLoggedIn: isLoggedIn
      };
    };

    return session;
  });
