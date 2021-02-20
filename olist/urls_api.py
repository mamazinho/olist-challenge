from django.urls import path, include
from rest_framework.routers import DefaultRouter
from olist.views.api import *

router = DefaultRouter()

router.register(r'categories', CategoryViewSet, basename='categories')
router.register(r'products', ProductViewSet, basename='products')
router.register(r'market-places', MarketPlaceViewSet, basename='market-places')
router.register(r'sellers', SellerViewSet, basename='sellers')


urlpatterns = router.urls