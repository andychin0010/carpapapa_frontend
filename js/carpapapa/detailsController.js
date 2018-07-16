cpApp.controller('detailsController', ['$scope', '$routeParams', 'restService', function detailsController($scope, $routeParams, restService) {

    var id = $routeParams.id;
    var hours = [
        'Sunday 11:00AM - 5:00PM',
        'Monday Closed',
        'Tuesday 10:00AM - 6:00PM',
        'Wednesday 10:00AM - 6:00PM',
        'Thursday 10:00AM - 6:00PM',
        'Friday 10:00AM - 6:00PM',
        'Saturday 11:00AM - 5:00PM'];

  init();

  $scope.accordion = {
      isSpecificationOpen: true,
      isExteriorOpen: false,
      isInteriorOpen: false,
      isSafetyOpen: false
  }

  $scope.options = {
      exterior: [],
      interior: [],
      safety: []
  }

  $scope.back = function() {
      window.history.back();
  }

  $scope.openSpecification = function() {
      $scope.accordion.isSpecificationOpen = !$scope.accordion.isSpecificationOpen;
  }

  $scope.openExterior = function() {
      $scope.accordion.isExteriorOpen = !$scope.accordion.isExteriorOpen;
  }

  $scope.openInterior = function() {
      $scope.accordion.isInteriorOpen = !$scope.accordion.isInteriorOpen;
  }
  $scope.openSafety = function() {
      $scope.accordion.isSafetyOpen = !$scope.accordion.isSafetyOpen;
  }
  // $scope.options.exterior = [];
  // $scope.options.interior = [];
  // $scope.options.safety = [];

  restService.getProduct(id).then(
      function success(response) {
          console.log(response.data);

          $scope.product = response.data;
          $scope.$parent.title = $scope.product.year + " " + $scope.product.make + " " + $scope.product.model;
        //   $scope.$parent.images =
        console.log();

          var slider = '';
          var flag = true;

          console.log('testing', response.data.images);
          if (!response.data.images || response.data.images.length === 0 || (response.data.images.length === 1 && response.data.images[0].type === 'ICON')) {
              console.log('testing1');
              slider = '<div class="ms-slide"><img src="masterslider/blank.gif" data-src="images/coming_soon.jpg" alt="Vehicle Photo"/>';
              $('#prod-gal').append(slider + '<img class="ms-thumb" src="images/coming_soon.jpg" alt="thumb" width="829" height="726"/></div>');
          } else {
              console.log('testing2');
              angular.forEach(response.data.images, function(image) {
                  if (image.type == "DEFAULT") {
                      slider = '<div class="ms-slide"><img src="masterslider/blank.gif" data-src="' + image.path + '" alt="Vehicle Photo"/>';
                      $('#prod-gal').append(slider + '<img class="ms-thumb" src="' + image.path + '" alt="thumb" width="829" height="726"/></div>');
                    //   if (flag) {
                    //       $scope.$parent.image = image.path;
                    //   }
                //   } else if (image.type == "THUMBNAIL") {
                //       $('#prod-gal').append(slider + '<img class="ms-thumb" src="' + image.path + '" alt="thumb" /></div>');
                  }
              })
          }

          //Product Gallery
          if($('#prod-gal').length > 0) {
              var categorySlider = new MasterSlider();
              categorySlider.control('thumblist' , {autohide:false ,dir:'h',align:'bottom', width:137, height:120, margin:15, space:0});
              categorySlider.setup('prod-gal' , {
                      width:829,
                      height:726,
                    //   width:550,
                    //   height:484,
                      speed: 25,
                    //   preload:'all',
                      loop:true,
                      view:'fade'
              });
          }
      }
  )

  restService.getProductOptionsByProductId(id).then(
      function success(response) {
          console.log(response.data);
        //   $scope.options = response.data;

          angular.forEach(response.data, function(option) {
              console.log('option', option);
              if (option.type) {
                  if (option.type.toLowerCase() === 'EXTERIOR'.toLowerCase()) {
                      $scope.options.exterior.push(option.option);
                  } else if (option.type.toLowerCase() === 'INTERIOR'.toLowerCase()) {
                      $scope.options.interior.push(option.option);
                  } else if (option.type.toLowerCase() === 'SAFETY'.toLowerCase()) {
                      $scope.options.safety.push(option.option);
                  }
              }
          })
      }
  )

  function init() {
  	//Add(+/-) Button Number Incrementers
  	$(".incr-btn").on("click", function(e) {
  		var $button = $(this);
  		var oldValue = $button.parent().find("input").val();
  		if ($button.text() == "+") {
  			var newVal = parseFloat(oldValue) + 1;
  		} else {
  		 // Don't allow decrementing below 1
  			if (oldValue > 1) {
  				var newVal = parseFloat(oldValue) - 1;
  			} else {
  				newVal = 1;
  			}
  		}
  		$button.parent().find("input").val(newVal);
  		e.preventDefault();
  	});

    var today = new Date();
    $scope.hours = hours[today.getDay()];
  }
}])
