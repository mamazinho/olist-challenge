from olist.models import Seller
from olist.serializers import SellerSerializer
from rest_framework import viewsets
from rest_framework.decorators import action
from django.db.models import Q

class SellerViewSet(viewsets.ModelViewSet):
    serializer_class = SellerSerializer

    def get_queryset(self):
        params = self.request.query_params

        if params:
            if 'value' in params:
                condition = self.__get_any_field(params)
                queryset = Seller.objects.filter(condition)
            else:
                params = self.__format_params(params)
                queryset = Seller.objects.filter(**params)

        else:
            queryset = Seller.objects.all()
        return queryset.order_by('-id')

    def __get_any_field(self, params):
        value = params.get('value')
        condition = Q(nick_name__icontains=value) \
                    |Q(corporate_name__icontains=value) \
                    |Q(seller_cnpj__icontains=value) \
                    |Q(contact_email__icontains=value) \
                    |Q(phone_number__icontains=value) \
                    |Q(address__icontains=value)

        return condition

    def __format_params(self, params):
        new_params = {}
        for param in params:
            new_params[f'{param}__icontains'] = params[param]

        return new_params