from django.test import TestCase
from olist.models import Product, Category, MarketPlace, Seller
from olist.serializers import CategorySerializer, ProductSerializer, MarketPlaceSerializer, SellerSerializer

class SerializersTest(TestCase):

    @classmethod
    def setUpTestData(cls):
        cls.product = Product.objects.create(
            product_name = 'Teste',
            product_description = 'This is a test product',
            product_value = 25.50,
        )
        cls.category = Category.objects.create(
            category_name = 'Teste Category',
            category_description = 'This is a test category'
        )
        cls.mp = MarketPlace.objects.create(
            market_place_name = 'Teste MP',
            market_place_description = 'This is a test marketplace',
            site = 'test.com',
            contact_email = 'test@test.com',
            phone_number = 41999996666,
            technical_contact = 'test',
        )
        cls.seller = Seller.objects.create(
            nick_name = 'Test Seller',
            corporate_name = 'We will be the best sellers in the world',
            seller_cnpj = 12345678901234,
            contact_email = 'test@test.com',
            phone_number = 41999996666,
            address = 'test street',
        )
        cls.product.categories.set([cls.category.id])

    def test_product_serializer(self):
        serializer = ProductSerializer(instance=self.product)
        self.assertEqual(serializer.data['product_value'], 25.50)

    def test_category_serializer(self):
        serializer = CategorySerializer(instance=self.category)
        self.assertEqual(serializer.data['category_name'], 'Teste Category')
        
    def test_mp_serializer(self):
        serializer = MarketPlaceSerializer(instance=self.mp)
        self.assertEqual(serializer.data['technical_contact'], 'test')

    def test_seller_serializer(self):
        serializer = SellerSerializer(instance=self.seller)
        self.assertEqual(serializer.data['phone_number'], 41999996666)