from olist.models import MarketPlace
from olist.serializers import MarketPlaceSerializer
from rest_framework import viewsets
from rest_framework.decorators import action
from django.db.models import Q

class MarketPlaceViewSet(viewsets.ModelViewSet):
    serializer_class = MarketPlaceSerializer

    def get_queryset(self):
        params = self.request.query_params
        if params and 'athlete_name' in params:
            athlete_name = params.get('athlete_name').title()
            queryset = MarketPlace.objects.filter(athlete_name__icontains=athlete_name)
        else:
            queryset = MarketPlace.objects.all()
        return queryset.order_by('-id')