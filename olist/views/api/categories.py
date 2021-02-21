from olist.models import Category, Product
from olist.serializers import CategorySerializer, CategoryProductSerializer
from rest_framework import viewsets
from django.db.models import Q

class CategoryViewSet(viewsets.ModelViewSet):
    # serializer_class = CategoryProductSerializer

    def get_serializer_class(self):
        params = self.request.query_params
        if params and 'productList' in params:
            return CategorySerializer

        return CategoryProductSerializer

    def get_queryset(self):
        params = self.request.query_params

        if params and not 'productList' in params:
            if 'value' in params:
                condition = self.__get_any_field(params)
                queryset = Category.objects.filter(condition)
            else:
                params = self.__format_params(params)
                queryset = Category.objects.filter(**params)

        else:
            queryset = Category.objects.all()
        return queryset.order_by('-id')

    def __get_any_field(self, params):
        value = params.get('value')
        condition = Q(category_name__icontains=value) \
                    |Q(category_description__icontains=value) \

        return condition

    def __format_params(self, params):
        new_params = {}
        for param in params:
            new_params[f'{param}__icontains'] = params[param]

        return new_params