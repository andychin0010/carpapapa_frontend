cpApp.controller('buyController', ['$scope', '$filter', 'restService', function buyController($scope, $filter, restService) {
  console.log('buyController');

  init();
  getProducts();
  getFeatures();

  $('#price-range').change(function() {
      $scope.filter();
  })

  $('#minVal').change(function() {
      $scope.filter();
  })

  $('#maxVal').change(function() {
      $scope.filter();
  })

    function getProducts() {
        restService.getProducts().then(
          function success(response) {
            $scope.products = response.data.products;

            // TODO: Fix Badge
            // angular.forEach(response.data, function(product) {
            //     if (product.status == 'FEATURE') {
            //         product.badge = 'sale';
            //     } else if (product.status == 'NEW') {
            //         product.badge = 'best-seller';
            //     } else {
            //         product.badge = 'out';
            //     }
            // })

          //   console.log('products', response.data);
          //   console.log('features', $scope.features);
          }, function error(response) {
            console.log('error');
          }
        );
    }


    function getFeatures() {
        restService.getProducts(null, null, null, null, null, 'FEATURE').then(
            function success(response) {
              $scope.products = response.data.products;

              angular.forEach(response.data.products, function(product) {
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
              console.log('products', response.data.products);
              console.log('features', $scope.features);
            }, function error(response) {
              console.log('error');
            }
        );
    }

$scope.filter = function() {
    var brandFilter = null;
    var colorFilter = null;
    if ($scope.brandFilter != 'Please select') {
        brandFilter = $scope.brandFilter;
    }

    if ($scope.colorFilter != 'Please select') {
        colorFilter = $scope.colorFilter;
    }
    // console.log(colorFilter);
    filterProducts(null, $('#minVal').val(), $('#maxVal').val(), brandFilter, colorFilter);
    // restService.getProducts(null, null, null, brandFilter, colorFilter).then(
    //     function success(response) {
    //         $scope.products = response.data;
    //         console.log('updated');
    //     }
    // )
}

$scope.clearBrands = function() {
    $scope.brandFilter = "Please select";
    $scope.filter();
}

$scope.clearColors = function() {
    $scope.colorFilter = "Please select";
    $scope.filter();
}

function filterProducts(limit, minPrice, maxPrice, make, exColor) {
    restService.getProducts(null, minPrice, maxPrice, make, exColor).then(
        function success(response) {
            $scope.products = response.data.products;
            console.log('updated');
        }
    )
}

  function init() {
    $scope.$on('$viewContentLoaded', function() {

      var $subcatToggle = $('.filter-section .categories .has-subcategory > a');
      var $filterToggle = $('.filter-toggle');

      /*Catalog Filters
    	*******************************************/
    	//Price Slider Range
    	var $minVal = parseInt($('#minVal').attr('data-min-val'));
    	var $maxVal = parseInt($('#maxVal').attr('data-max-val'));
    	var $startMin = parseInt($('#minVal').val());
    	var $startMax = parseInt($('#maxVal').val());
    	if($('#price-range').length > 0){
    		$('#price-range').noUiSlider({
    			range: {
    				'min': $minVal,
    				'max': $maxVal
    			},
    			start: [$startMin,$startMax],
    			connect: true,
    			serialization: {
    				lower: [
    					$.Link({
    						target: $('#minVal'),
    						format: {
    							decimals: 0
    						}
    					})
    				],
    				upper: [
    					$.Link({
    						target: $('#maxVal'),
    						format: {
    							decimals: 0
    						}
    					})
    				]
    			}
    		});
    	}

    	//Clear price filters
    	$('#clearPrice').click(function(){
    		$('#price-range').val([$startMin, $startMax], { set: true });
    	});

    	//Clear Checkbox filters
    	$('.clearChecks').click(function(){
    		$(this).parent().find('.icheckbox').removeClass('checked');
    	});

    	//Categories accordion
    	$subcatToggle.click(function(e){
    		$(this).parent().toggleClass('opened');
    		$(this).parent().find('.subcategory').toggleClass('open');
    		e.preventDefault();
    	});

    	//Filter Toggle / Showing Filters in Modal
    	$filterToggle.click(function(){
    		$('.shop-filters').appendTo($('#filterModal .modal-body'));
    		$('#filterModal .modal-body .shop-filters').css('display', 'block');
    	});

    	$('#filterModal').on('hide.bs.modal', function(){
    		$('.shop-filters').appendTo('.filters-mobile');
    	});

    	$(window).resize(function(){
    		if($(window).width() > 768){
    			$('#filterModal').modal('hide');
    		}
    	});
    })
  }
}])
