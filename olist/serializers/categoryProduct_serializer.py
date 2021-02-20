from olist.models import Category, Product
from rest_framework import serializers

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class ProductSerializer(serializers.ModelSerializer):
    # event = EventOnlySerializer(read_only=True, many=True)

    class Meta:
        model = Product
        fields = '__all__'

class CategoryProductSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)

    class Meta:
        model = Category
        fields = '__all__'

    
class ProductCategorySerializer(serializers.ModelSerializer):
    # event = serializers.PrimaryKeyRelatedField(queryset=Event.objects.all(), many=True)
    Category = CategorySerializer(read_only=True)

    class Meta:
        model = Product
        fields = '__all__'
