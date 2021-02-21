challenge.controller('ProductsCtrl', function($scope, HttpFctr, $rootScope){

  $scope.__init__ = function(){
    $scope.products = []
    $scope.categories = []
    $scope.auxCategories = []
    $scope.openCreateProductModal = false
    $scope.openEditProductModal = false
    $scope.openProductAdvanceFilter = false
    $scope.selectedCategory = 0
    $scope.productCategories = []
    $scope.createProduct = {
      'product_name': '',
      'product_description': '',
      'product_value': 0,
      'categories': [],
    }
    $scope.editProduct = {
      'id': 0,
      'product_name': '',
      'product_description': '',
      'product_value': 0,
      'categories': [],
    }
    $scope.params = {
      'value': '',
      'id': 0,
      'product_name': '',
      'product_description': '',
      'product_value': 0,
      'categories': [],
    }
    $scope.getProducts()
  }

  // Get the Products from API
  $scope.getProducts = function() {
    $scope.onlyValidParams()
    HttpFctr('products', 'GET', {params: $scope.params}).then(function(response){
      $scope.products = response
      $scope.openProductAdvanceFilter = false
      $scope.params = {}
      $scope.getCategories()
    })
  }

  $scope.getCategories = function() {
    HttpFctr('categories', 'GET', {params: {productList: true}}).then(function(response){
      $scope.categories = response
      $scope.auxCategories = response
    })
  }

  // Create new Product on API
  $scope.createNewProduct = function() {
    console.log('vai criar', $scope.createProduct)
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
    console.log('AAAAAAAAAA', $scope.editProduct)
    HttpFctr(`products/${$scope.editProduct.id}`, 'PATCH', {data}).then(function(){
      $scope.getProducts()
      $scope.openEditProductModal = false
      $scope.editProduct = {'categories': []}
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
    var category = $scope.categories.filter(cat => cat.id == category_id)[0]
    if (!category) return
    $scope.createProduct.categories.push(category.id)
    $scope.editProduct.categories.push(category.id)
    $scope.productCategories.push(category)
    var indexToDelete = $scope.auxCategories.findIndex((cat) => cat.id == category_id)
    indexToDelete >= 0 ? $scope.auxCategories.splice(indexToDelete, 1) : $scope.auxCategories
  }

  $scope.removeProductCategory = function(category_name) {
    var category = $scope.categories.filter(cat => cat.category_name == category_name)[0]
    console.log(category)
    if (!category) return
    // $scope.createProduct.categories.push(category.id)
    // $scope.editProduct.categories.push(category.id)
    // console.log('passa aqui', category.category_name)
    // $scope.productCategories.push(category.category_name)
    // var indexToDelete = $scope.categories.findIndex((cat) => cat.id == category_id)
    // indexToDelete >= 0 ? $scope.categories.splice(indexToDelete, 1) : $scope.categories
  }

  $scope.editProductModal = function(product) {
    $scope.openEditProductModal = true
    $scope.editProduct.id = product.id
    $scope.editProduct.product_name = product.product_name
    $scope.editProduct.product_description = product.product_description
    $scope.editProduct.product_value = product.product_value
    for (category in product.categories) {
      var category_id = product.categories[category].id
      $scope.insertProductCategory(category_id)
    }
  }
  
  $scope.onlyValidParams = function() {
    for (param in $scope.params) {
      if (!$scope.params[param])
        delete $scope.params[param]
    }
  }

  $scope.__init__()

})
