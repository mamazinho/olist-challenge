challenge.controller('SellersCtrl', function($scope, HttpFctr, $rootScope){

  $scope.__init__ = function(){
    $scope.sellers = []
    $scope.filter_name = ''
    $scope.openCreateSellerModal = false
    $scope.openEditSellerModal = false
    $scope.createSeller = {
      'nick_name': '',
      'corporate_name': '',
      'seller_cnpj': '',
      'contact_email': '',
      'phone_number': '',
      'address': '',
    }
    $scope.editSeller = {
      'id': '',
      'nick_name': '',
      'corporate_name': '',
      'seller_cnpj': '',
      'contact_email': '',
      'phone_number': '',
      'address': '',
    }
    $scope.params = {
      'name': null
    }
    $scope.getSellers()
  }

  $scope.getSellers = function() {
    HttpFctr('sellers', 'GET', {params: $scope.params}).then(function(response){
      $scope.sellers = response.results
      $scope.params.name = null
    })
  }

  $scope.createNewSeller = function() {
    var data = JSON.stringify($scope.createSeller)
    HttpFctr('sellers', 'POST', {data}).then(function(){
      $scope.getSellers()
      $scope.openCreateSellerModal = false
      $scope.createSeller = {}
    }).catch((error) => {
      console.log('ERROR >>', error)
      alert(window.errorMessage)
    })
  }

  // Update Event
  $scope.updateSeller = function() {
    var data = JSON.stringify($scope.editSeller)
    HttpFctr(`sellers/${$scope.editSeller.id}`, 'PUT', {data}).then(function(){
      $scope.getSellers()
      $scope.openEditSellerModal = false
      $scope.editSeller = {}
    }).catch((error) => {
      console.log('ERROR >>', error)
      alert(window.errorMessage)
    })
  }

  // Delete Event
  $scope.deleteSeller = function(seller_id) {
    HttpFctr(`sellers/${seller_id}`, 'DELETE').then(function(){
      $scope.getSellers()
    }).catch((error) => {
      console.log('ERROR >>', error)
      alert(window.errorMessage)
    })
  }
  
  $scope.__init__()

})
