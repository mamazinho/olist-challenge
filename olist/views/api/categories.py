from olist.models import Category, Product
from olist.serializers import CategorySerializer, CategoryProductSerializer
from rest_framework import viewsets
from rest_framework.decorators import action

class CategoryViewSet(viewsets.ModelViewSet):
    serializer_class = CategorySerializer

    def get_queryset(self):
        params = self.request.query_params
        if params and 'athlete_name' in params:
            athlete_name = params.get('athlete_name').title()
            queryset = Category.objects.filter(athlete_name__icontains=athlete_name)
        else:
            queryset = Category.objects.all()
        return queryset.order_by('-id')

class CategoryProductViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()

    def get_serializer_class(self):
        if self.action in ['create', 'update']:
            return CategorySerializer

        return CategoryProductSerializer