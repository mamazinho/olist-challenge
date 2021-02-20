challenge.controller('BaseCtrl', function($scope, $rootScope){

  $scope.__init__ = function(){
    $rootScope.active_tab = 'products'
    window.errorMessage = ''
  }

  $scope.__init__()

})
