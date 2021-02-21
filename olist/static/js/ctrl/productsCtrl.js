challenge.controller('ProductsCtrl', function($scope, HttpFctr, $rootScope){

  $scope.__init__ = function(){
    $scope.products = []
    $scope.allCategories = []
    $scope.auxCategories = []
    $scope.openCreateProductModal = false
    $scope.openEditProductModal = false
    $scope.openProductAdvanceFilter = false
    $scope.selectedCategory = 0
    $scope.productCategories = []
    $scope.createProduct = {
      'product_name': '',
      'product_description': '',
      'product_value': '',
      'categories': [],
    }
    $scope.editProduct = {
      'id': 0,
      'product_name': '',
      'product_description': '',
      'product_value': '',
      'categories': [],
    }
    $scope.params = {
      'value': '',
      'product_name': '',
      'product_description': '',
      'product_value': '',
      'categories': [],
    }
    $scope.getProducts()
    $scope.getCategories()
  }

  // Get the Products from API
  $scope.getProducts = function() {
    $scope.onlyValidParams()
    HttpFctr('products', 'GET', {params: $scope.params}).then(function(response){
      $scope.products = response
      $scope.openProductAdvanceFilter = false
      $scope.params = {}
    })
  }

  $scope.getCategories = function() {
    HttpFctr('categories', 'GET', {params: {productList: true}}).then(function(response){
      $scope.allCategories = response
    })
  }

  // Create new Product on API
  $scope.createNewProduct = function() {
    var data = JSON.stringify($scope.createProduct)
    HttpFctr('products', 'POST', {data}).then(function(){
      $scope.getProducts()
      $scope.openCreateProductModal = false
      $scope.createProduct = {}
    }).catch((error) => {
      console.log('ERROR >>', error)
      alert(window.errorMessage)
    })
  }

  // Update Product
  $scope.updateProduct = function() {
    var data = JSON.stringify($scope.editProduct)
    console.log('EDDDDD', $scope.editProduct)
    HttpFctr(`products/${$scope.editProduct.id}`, 'PATCH', {data}).then(function(){
      $scope.getProducts()
      $scope.openEditProductModal = false
      $scope.editProduct = {}
    }).catch((error) => {
      console.log('ERROR >>', error)
      alert(window.errorMessage)
    })
  }

  // Delete Product
  $scope.deleteProduct = function(product_id) {
    HttpFctr(`products/${product_id}`, 'DELETE').then(function(){
      $scope.getProducts()
    }).catch((error) => {
      console.log('ERROR >>', error)
      alert(window.errorMessage)
    })
  }

  $scope.insertProductCategory = function(category_id) {
    var category = $scope.allCategories.filter(cat => cat.id == category_id)[0]
    if (!category) return
    $scope.createProduct.categories.push(category.id)
    $scope.editProduct.categories.push(category.id)
    $scope.productCategories.push(category)
    $scope.findAndDeleteIndex($scope.auxCategories, category_id)
  }

  $scope.removeProductCategory = function(category) {
    if (!category) return
    $scope.findAndDeleteIndex($scope.createProduct.categories, category.id)
    $scope.findAndDeleteIndex($scope.editProduct.categories, category.id)
    $scope.findAndDeleteIndex($scope.productCategories, category.id)
    $scope.auxCategories.push(category)
  }

  $scope.findAndDeleteIndex = function(list, toFind) {
    var indexToDelete = list.findIndex((cat) => cat.id == toFind || cat == toFind)
    indexToDelete >= 0 ? list.splice(indexToDelete, 1) : list
  }

  $scope.editProductModal = function(product) {
    $scope.openEditProductModal = true
    $scope.editProduct.id = product.id
    $scope.editProduct.product_name = product.product_name
    $scope.editProduct.product_description = product.product_description
    $scope.editProduct.product_value = product.product_value
    $scope.editProduct.categories = []
    $scope.productCategories = []
    $scope.auxCategories = angular.copy($scope.allCategories)
    for (category in product.categories) {
      var category_id = product.categories[category].id
      $scope.insertProductCategory(category_id)
    }
  }
  
  $scope.openCreateProduct = function() {
    $scope.openCreateProductModal = true
    $scope.productCategories = []
    $scope.auxCategories = angular.copy($scope.allCategories)
  }
  
  $scope.onlyValidParams = function() {
    for (param in $scope.params) {
      if (!$scope.params[param])
        delete $scope.params[param]
    }
  }

  $scope.__init__()

})