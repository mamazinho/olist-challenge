challenge.controller('CategoriesCtrl', function($scope, HttpFctr, $rootScope){

  $scope.__init__ = function(){
    $scope.categories = []
    $scope.treeIds = []
    $scope.secondTreeIds = []
    $scope.filter_name = ''
    $scope.renderHeader = 'eventInEvent'
    $scope.openCreateCategoryModal = false
    $scope.openEditCategoryModal = false
    $scope.createCategory = {
      'name': '',
      'description': '',
    }
    $scope.editCategory = {
      'id': '',
      'name': '',
      'description': '',
    }
    $scope.params = {
      'name': null
    }
    $scope.getCategories()
  }

  // Get the Events from API
  $scope.getCategories = function() {
    HttpFctr('events', 'GET', {params: $scope.params}).then(function(response){
      $scope.events = response.results
      $scope.params.name = null
    })
  }
  // Create new Event on API
  $scope.createCategory = function() {
    var data = JSON.stringify($scope.createCategory)
    HttpFctr('events', 'POST', {data}).then(function(){
      $scope.getCategories()
      $scope.openCreateCategoryModal = false
      $scope.createCategory = {}
    }).catch((error) => {
      console.log('ERROR >>', error)
      alert(window.errorMessage)
    })
  }

  // Update Event
  $scope.updateCategory = function() {
    var data = JSON.stringify($scope.editCategory)
    HttpFctr(`events/${$scope.editCategory.id}`, 'PUT', {data}).then(function(){
      $scope.getCategories()
      $scope.openEditCategoryModal = false
      $scope.editCategory = {}
    }).catch((error) => {
      console.log('ERROR >>', error)
      alert(window.errorMessage)
    })
  }

  // Delete Event
  $scope.deleteCategory = function(category_id) {
    HttpFctr(`events/${category_id}`, 'DELETE').then(function(){
      $scope.getCategories()
    }).catch((error) => {
      console.log('ERROR >>', error)
      alert(window.errorMessage)
    })
  }

  $scope.editCategoryModal = function(category) {
    $scope.openEditEventModal = true
    $scope.editCategory.id = category.id
    $scope.editCategory.name = category.name
    $scope.editCategory.description = category.description
  }

  $scope.viewMore = function(treeStr, id) {
    tree = eval(`$scope.${treeStr}`)
    if (!tree.includes(id)) {
      tree.push(id)
      if (treeStr == 'treeIds')
        $scope.renderHeader = 'infosInEvent'
    } else {
      tree.splice(tree.findIndex((item) => item == id), 1)
      if (treeStr == 'treeIds')
        $scope.renderHeader = 'eventInEvent'
      else if (treeStr == 'secondTreeIds')
        $scope.renderHeader = 'infosInEvent'
    }
  }

  $scope.__init__()

})
