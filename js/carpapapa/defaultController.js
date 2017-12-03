cpApp.controller('defaultController', ['$scope', '$filter', 'restService', function defaultController($scope, $filter, restService) {
  console.log('defaultController');

  init();
  getFeatures();

  function getFeatures() {
      restService.getProducts(null, null, null, null, null, 'FEATURE').then(
          function success(response) {
            $scope.products = response.data;

            angular.forEach(response.data, function(product) {
                $('.brand-carousel .inner').append('<a class="item" href="#!/buy/details/' + product.id + '"><img style="height: 164px" src="' + product.images[0].path + '" alt="1"/><span>' + product.year + ' ' + product.make + '</br>' + $filter('currency')(product.price, '$', 0) + '</span></a>');
                product.badge = 'sale';
            })

            /*Initializing Brands Carousel Plugin
            *******************************************/
            $('.brand-carousel .inner').owlCarousel({
              // Define custom and unlimited items depending from the width
              // If this option is set, itemsDeskop, itemsDesktopSmall, itemsTablet, itemsMobile etc. are disabled
              // For better preview, order the arrays by screen size, but it's not mandatory
              // Don't forget to include the lowest available screen size, otherwise it will take the default one for screens lower than lowest available.
              // In the example there is dimension with 0 with which cover screens between 0 and 450px
              itemsCustom : [
                [0, 1],
                [340, 2],
                [580, 3],
                [991, 4],
                [1200, 5]
              ],
              navigation : true,
              theme: "",
              navigationText : ["",""]
            });

            console.log('testing');
            console.log('products', response.data);
            console.log('features', $scope.features);
          }, function error(response) {
            console.log('error');
          }
      );
  }

  function init() {
      $scope.$on('$viewContentLoaded', function() {

        /*Hero Fullscreen Slider
      	*******************************************/
        if($('#fullscreen-slider').length > 0) {
          var fullscreenSlider = new MasterSlider();
          fullscreenSlider.control('arrows');
          fullscreenSlider.control('bullets');
          fullscreenSlider.setup('fullscreen-slider' , {
              width:1140,
              height:455,
              space:0,
              speed: 18,
              autoplay: true,
              loop: true,
              layout: 'fullscreen',
              fullscreenMargin: 82,
              preload:'all',
              view:'mask',
              instantStartLayers: true
          });
        }
      })
  }
}])
