from olist.models import Product, Category
from olist.serializers import ProductSerializer
from rest_framework import viewsets
from rest_framework.decorators import action

class ProductViewSet(viewsets.ModelViewSet):
    serializer_class = ProductSerializer

    def get_queryset(self):
        params = self.request.query_params
        if params and 'athlete_name' in params:
            athlete_name = params.get('athlete_name').title()
            queryset = Product.objects.filter(athlete_name__icontains=athlete_name)
        else:
            queryset = Product.objects.all()
        return queryset.order_by('-id')

class ProductCategoryViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()

    def get_serializer_class(self):
        if self.action in ['create', 'update']:
            return ProductSerializer

        return ProductSerializer