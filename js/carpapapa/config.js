cpApp.config(['$locationProvider', '$routeProvider',
  function config($locationProvider, $routeProvider) {

    $routeProvider.
      when('/home', {
        templateUrl: 'html/views/default.html',
        controller: 'defaultController'
      }).
      when('/', {
        templateUrl: 'html/views/buy.html',
        controller: 'buyController'
      }).
      when('/buy', {
        templateUrl: 'html/views/buy.html',
        controller: 'buyController'
      }).
      when('/buy/details/:id', {
        templateUrl: 'html/views/details.html',
        controller: 'detailsController'
      }).
      otherwise('/');
  }
]);
