from olist.models import Product, Category
from olist.serializers import ProductSerializer, ProductCategorySerializer
from rest_framework import viewsets
from django.db.models import Q

class ProductViewSet(viewsets.ModelViewSet):
    serializer_class = ProductCategorySerializer

    def get_serializer_class(self):
        params = self.request.query_params
        if self.action in ['create', 'update', 'partial_update']:
            return ProductSerializer
        if params and 'productList' in params:
            return ProductSerializer

        return ProductCategorySerializer

    def get_queryset(self):
        params = self.request.query_params

        if params and not 'productList' in params:
            if 'value' in params:
                condition = self.__get_any_field(params)
                queryset = Product.objects.filter(condition)
            else:
                params = self.__format_params(params)
                queryset = Product.objects.filter(**params)

        else:
            queryset = Product.objects.all()
        return queryset.order_by('-id')


    def __get_any_field(self, params):
        value = params.get('value')
        condition = Q(product_name__icontains=value) \
                    |Q(product_description__icontains=value) \
                    |Q(product_value__icontains=value) \

        return condition

    def __format_params(self, params):
        new_params = {}
        for param in params:
            new_params[f'{param}__icontains'] = params[param]

        return new_params


class ProductCategoryViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()

    def get_serializer_class(self):
        if self.action in ['create', 'update']:
            return ProductSerializer

        return ProductSerializer