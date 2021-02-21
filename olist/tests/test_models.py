from django.test import TestCase
from olist.models import Product, Category, MarketPlace, Seller

class ModelsTest(TestCase):

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

    def test_product_model(self):
        record = Product.objects.all().first()
        self.assertEqual(record, self.product)
        
    def test_category_info_model(self):
        record = Category.objects.all().first()
        self.assertEqual(record, self.category)

    def test_mp_model(self):
        record = MarketPlace.objects.all().first()
        self.assertEqual(record, self.mp)

    def test_seller_model(self):
        record = Seller.objects.all().first()
        self.assertEqual(record, self.seller)