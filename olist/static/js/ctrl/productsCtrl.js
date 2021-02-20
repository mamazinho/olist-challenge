challenge.controller('ProductsCtrl', function($scope, HttpFctr, $rootScope){

  $scope.__init__ = function(){
    $scope.products = []
    $scope.treeIds = []
    $scope.secondTreeIds = []
    $scope.thirdTreeIds = []
    $scope.filter_name = ''
    $scope.renderHeader = 'generic'
    $scope.openCreateProductModal = false
    $scope.openEditProductModal = false
    $scope.createProduct = {
      'name': '',
      'description': '',
      'value': '',
      'categories': '',
    }
    $scope.editProduct = {
      'id': '',
      'name': '',
      'description': '',
      'value': '',
      'categories': '',
    }
    $scope.params = {
      'name': '',
      'description': '',
      'value': '',
      'categories': '',
    }
    $scope.getProducts()
  }

  // Get the Products from API
  $scope.getProducts = function() {
    HttpFctr('products', 'GET', {params: $scope.params}).then(function(response){
      $scope.products = response.results
      $scope.params.name = null
    })
  }

  // Create new Product on API
  $scope.createProduct = function() {
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
    HttpFctr(`products/${$scope.editProduct.id}`, 'PUT', {data}).then(function(){
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

  $scope.editProductModal = function(product) {
    $scope.openEditProductModal = true
    $scope.editProduct.id = product.id
    $scope.editProduct.athlete = product.athlete
    $scope.editProduct.sex = product.sex
    $scope.editProduct.age = product.age
    $scope.editProduct.height = product.height
    $scope.editProduct.weight = product.weight
    $scope.editProduct.team = product.team
    $scope.editProduct.medal = product.medal
  }

  $scope.viewMore = function(treeStr, id) {
    tree = eval(`$scope.${treeStr}`)
    if (!tree.includes(id)) {
      tree.push(id)
      if (treeStr == 'treeIds')
        $scope.renderHeader = 'athlete_infos'
      else if (treeStr == 'secondTreeIds')
        $scope.renderHeader = 'event'

    } else {
      tree.splice(tree.findIndex((item) => item == id), 1)
      if (treeStr == 'treeIds')
        $scope.renderHeader = 'generic'
      else if (treeStr == 'secondTreeIds')
        $scope.renderHeader = 'athlete_infos'
    }
  }

  $scope.__init__()

})
