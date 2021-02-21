from olist.models import MarketPlace
from olist.serializers import MarketPlaceSerializer
from rest_framework import viewsets
from django.db.models import Q

class MarketPlaceViewSet(viewsets.ModelViewSet):
    serializer_class = MarketPlaceSerializer

    def get_queryset(self):
        params = self.request.query_params

        if params:
            if 'value' in params:
                condition = self.__get_any_field(params)
                queryset = MarketPlace.objects.filter(condition)
            else:
                params = self.__format_params(params)
                queryset = MarketPlace.objects.filter(**params)

        else:
            queryset = MarketPlace.objects.all()
        return queryset.order_by('-id')

    def __get_any_field(self, params):
        value = params.get('value')
        condition = Q(market_place_name__icontains=value) \
                    |Q(market_place_description__icontains=value) \
                    |Q(site__icontains=value) \
                    |Q(contact_email__icontains=value) \
                    |Q(phone_number__icontains=value) \
                    |Q(technical_contact__icontains=value)

        return condition

    def __format_params(self, params):
        new_params = {}
        for param in params:
            new_params[f'{param}__icontains'] = params[param]

        return new_params