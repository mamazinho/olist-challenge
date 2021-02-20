challenge.controller('BaseCtrl', function($scope, $rootScope){

  $scope.__init__ = function(){
    $rootScope.active_tab = 'sellers'
    window.errorMessage = ''
  }

  $scope.__init__()

})
