challenge.controller('MarketPlacesCtrl', function($scope, HttpFctr, $rootScope){

  $scope.__init__ = function(){
    $scope.marketplaces = []
    $scope.openCreateMPModal = false
    $scope.openEditMPModal = false
    $scope.openMPAdvanceFilter = false
    $scope.createMP = {
      'market_place_name': '',
      'market_place_description': '',
      'site': '',
      'contact_email': '',
      'phone_number': 0,
      'technical_contact': '',
    }
    $scope.editMP = {
      'id': 0,
      'market_place_name': '',
      'market_place_description': '',
      'site': '',
      'contact_email': '',
      'phone_number': 0,
      'technical_contact': '',
    }
    $scope.params = {
      'value': '',
      'market_place_name': '',
      'market_place_description': '',
      'site': '',
      'contact_email': '',
      'phone_number': 0,
      'technical_contact': '',
    }
    $scope.getMPs()
  }

  $scope.getMPs = function() {
    $scope.onlyValidParams()
    HttpFctr('market-places', 'GET', {params: $scope.params}).then(function(response){
      $scope.marketplaces = response
      $scope.params = {}
      $scope.openMPAdvanceFilter = false
    })
  }

  $scope.createNewMP = function() {
    var data = JSON.stringify($scope.createMP)
    HttpFctr('market-places', 'POST', {data}).then(function(){
      $scope.getMPs()
      $scope.openCreateMPModal = false
      $scope.createMP = {}
    }).catch((error) => {
      console.log('ERROR >>', error)
      alert(window.errorMessage)
    })
  }

  // Update Event
  $scope.updateMP = function() {
    var data = JSON.stringify($scope.editMP)
    HttpFctr(`market-places/${$scope.editMP.id}`, 'PATCH', {data}).then(function(){
      $scope.getMPs()
      $scope.openEditMPModal = false
      $scope.editMP = {}
    }).catch((error) => {
      console.log('ERROR >>', error)
      alert(window.errorMessage)
    })
  }

  // Delete Event
  $scope.deleteMP = function(mp_id) {
    HttpFctr(`market-places/${mp_id}`, 'DELETE').then(function(){
      $scope.getMPs()
    }).catch((error) => {
      console.log('ERROR >>', error)
      alert(window.errorMessage)
    })
  }
  
  $scope.editMPModal = function(mp) {
    $scope.openEditMPModal = true
    $scope.editMP.id = mp.id
    $scope.editMP.market_place_name = mp.market_place_name
    $scope.editMP.market_place_description = mp.market_place_description
    $scope.editMP.site = mp.site
    $scope.editMP.contact_email = mp.contact_email
    $scope.editMP.phone_number = mp.phone_number
    $scope.editMP.technical_contact = mp.technical_contact
  }

  $scope.onlyValidParams = function() {
    for (param in $scope.params) {
      if (!$scope.params[param])
        delete $scope.params[param]
    }
  }

  $scope.__init__()

})
