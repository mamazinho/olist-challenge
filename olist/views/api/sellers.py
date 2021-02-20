from olist.models import Seller
from olist.serializers import SellerSerializer
from rest_framework import viewsets
from rest_framework.decorators import action

class SellerViewSet(viewsets.ModelViewSet):
    serializer_class = SellerSerializer

    def get_queryset(self):
        params = self.request.query_params
        if params and 'athlete_name' in params:
            athlete_name = params.get('athlete_name').title()
            queryset = Seller.objects.filter(athlete_name__icontains=athlete_name)
        else:
            queryset = Seller.objects.all()
        return queryset.order_by('-id')