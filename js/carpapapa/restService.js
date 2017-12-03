cpApp.service('restService', ['$http', function($http) {

  var HOST = 'http://localhost:8081';
  var LIMIT = 50;

  this.getProducts = function(limit, minPrice, maxPrice, make, exColor, status) {
    return $http({
      method: 'GET',
      url: HOST + '/products?limit='
      + (limit ? limit : LIMIT)
      + (minPrice ? '&minPrice=' + minPrice : '')
      + (maxPrice ? '&maxPrice=' + maxPrice : '')
      + (make ? '&make=' + make : '')
      + (exColor ? '&exColor=' + exColor : '')
      + (status ? '&status=' + status : '')
    })
  }

  this.getProduct = function(id) {
    return $http({
      method: 'GET',
      url: HOST + '/products/' + id
    })
  }

  this.getProductOptionsByProductId = function(id) {
      return $http({
          method: 'GET',
          url: HOST + '/products/' + id + '/options',
      })
  }

  // this.getProducts = function() {
  //   $http({
  //       method: "GET",
  //       url: HOST + "/products/2"
  //   }).then(function success(response) {
  //     console.log('done');
  //     console.log(response);
  //   }, function error() {
  //     console.log('error');
  //   });
  // }
}]);
