cpApp.controller('mainController', ['$scope', 'restService', function mainController($scope, restService) {
  $scope.title = 'Carpapapa Auto Group';
  console.log('testing');

  $scope.subscribe = function() {
      console.log('subscribe', $scope.subscribeEmail);
  }
}])
