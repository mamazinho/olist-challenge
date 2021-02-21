challenge.controller('SellersCtrl', function($scope, HttpFctr, $rootScope){

  $scope.__init__ = function(){
    $scope.sellers = []
    $scope.openCreateSellerModal = false
    $scope.openEditSellerModal = false
    $scope.openSellerAdvanceFilter = false
    $scope.createSeller = {
      'nick_name': '',
      'corporate_name': '',
      'seller_cnpj': '',
      'contact_email': '',
      'phone_number': '',
      'address': '',
    }
    $scope.editSeller = {
      'id': 0,
      'nick_name': '',
      'corporate_name': '',
      'seller_cnpj': '',
      'contact_email': '',
      'phone_number': '',
      'address': '',
    }
    $scope.params = {
      'value': '',
      'id': 0,
      'nick_name': '',
      'corporate_name': '',
      'seller_cnpj': '',
      'contact_email': '',
      'phone_number': '',
      'address': '',
    }
    $scope.getSellers()
  }

  $scope.getSellers = function() {
    $scope.onlyValidParams()
    HttpFctr('sellers', 'GET', {params: $scope.params}).then(function(response){
      $scope.sellers = response
      $scope.params = {}
      $scope.openSellerAdvanceFilter = false
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
    HttpFctr(`sellers/${$scope.editSeller.id}`, 'PATCH', {data}).then(function(){
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
  
  $scope.editSellerModal = function(seller) {
    $scope.openEditSellerModal = true
    $scope.editSeller.id = seller.id
    $scope.editSeller.nick_name = seller.nick_name
    $scope.editSeller.corporate_name = seller.corporate_name
    $scope.editSeller.seller_cnpj = seller.seller_cnpj
    $scope.editSeller.contact_email = seller.contact_email
    $scope.editSeller.phone_number = seller.phone_number
    $scope.editSeller.address = seller.address
  }

  $scope.onlyValidParams = function() {
    for (param in $scope.params) {
      if (!$scope.params[param])
        delete $scope.params[param]
    }
  }

  $scope.__init__()

})
