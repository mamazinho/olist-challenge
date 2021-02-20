from olist.models import MarketPlace
from rest_framework import serializers

class MarketPlaceSerializer(serializers.ModelSerializer):
    class Meta:
        model = MarketPlace
        fields = '__all__'