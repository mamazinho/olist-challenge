challenge.controller('CategoriesCtrl', function($scope, HttpFctr, $rootScope){

  $scope.__init__ = function(){
    $scope.categories = []
    $scope.openCreateCategoryModal = false
    $scope.openEditCategoryModal = false
    $scope.openCategoryAdvanceFilter = false
    $scope.viewProducts = false
    $scope.createCategory = {
      'category_name': '',
      'category_description': '',
    }
    $scope.editCategory = {
      'id': 0,
      'category_name': '',
      'category_description': '',
    }
    $scope.params = {
      'value': '',
      'id': 0,
      'category_name': '',
      'category_description': '',
    }
    $scope.getCategories()
  }

  $scope.getCategories = function() {
    $scope.onlyValidParams()
    HttpFctr('categories', 'GET', {params: $scope.params}).then(function(response){
      $scope.categories = response
      $scope.openCategoryAdvanceFilter = false
      $scope.params = {}
    })
  }

  $scope.createNewCategory = function() {
    var data = JSON.stringify($scope.createCategory)
    HttpFctr('categories', 'POST', {data}).then(function(){
      $scope.getCategories()
      $scope.openCreateCategoryModal = false
      $scope.createCategory = {}
    }).catch((error) => {
      console.log('ERROR >>', error)
      alert(window.errorMessage)
    })
  }

  $scope.updateCategory = function() {
    var data = JSON.stringify($scope.editCategory)
    HttpFctr(`categories/${$scope.editCategory.id}`, 'PATCH', {data}).then(function(){
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
    HttpFctr(`categories/${category_id}`, 'DELETE').then(function(){
      $scope.getCategories()
    }).catch((error) => {
      console.log('ERROR >>', error)
      alert(window.errorMessage)
    })
  }

  $scope.editCategoryModal = function(category) {
    $scope.openEditCategoryModal = true
    $scope.editCategory.id = category.id
    $scope.editCategory.category_name = category.category_name
    $scope.editCategory.category_description = category.category_description
  }

  $scope.onlyValidParams = function() {
    for (param in $scope.params) {
      if (!$scope.params[param])
        delete $scope.params[param]
    }
  }

  $scope.__init__()

})
