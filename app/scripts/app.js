'use strict';

/**
 * @ngdoc overview
 * @name restaurantManagerApp
 * @description
 * # restaurantManagerApp
 *
 * Main module of the application.
 */
angular
  .module('restaurantManagerApp', [
    'ngTouch',
    'ionic',
    'LocalStorageModule',
    'ui.bootstrap',
    'pascalprecht.translate',
    'angularMoment'
  ])

  .run(function ($rootScope, $state, $location, SessionService) {

    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState) {

      var shouldLogin = toState.data !== undefined
        && toState.data.requireLogin
        && !SessionService.isToken().isLoggedIn ;

      // NOT authenticated - wants any private stuff
      if(shouldLogin)
      {
        $state.go('login');
        event.preventDefault();
        return;
      }

      // authenticated (previously) comming not to root main
      if(SessionService.isToken().isLoggedIn)
      {
        var shouldGoToMain = fromState.name === ""
          && toState.name !== "main.dashboard" ;
        return;
      }

    });
  })

  .config(function($stateProvider, $urlRouterProvider, $httpProvider) {
    //
    // For any unmatched url, redirect to /state1
    $urlRouterProvider.otherwise("/main");
    //
    // Now set up the states
    $stateProvider
      .state('main', {
        url: '/main',
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })

    // Use x-www-form-urlencoded Content-Type
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/json';
    $httpProvider.defaults.headers.put['Content-Type'] = 'application/json';
    $httpProvider.defaults.headers.common['Content-Type'] = $httpProvider.defaults.headers.post['Content-Type'];
    $httpProvider.interceptors.push(function($q, localStorageService) {
      return {
        'request': function(config) {

          config.headers = config.headers || {};
          if (localStorageService.get('user')) {
            config.headers.Authorization = 'Bearer ' + localStorageService.get('user').token;
          }
          return config;
        }
      };
    });

  });
