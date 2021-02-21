from rest_framework.test import APITestCase
from rest_framework import status

class ProductAPITest(APITestCase):

    @classmethod
    def setUpTestData(cls):
        cls.create_product = {
            'product_name': 'Test',
            'product_description': 'This is a test product',
            'product_value': 25.50,
            'categories': [1],
        }
        cls.edit_product = {
            'id': 1,
            'product_name': 'Test',
            'product_description': 'This test change the previous',
            'product_value': 50,
            'categories': [1],
        }
        cls.create_category = {
            'category_name': 'Test category',
            'category_description': 'This is a test category',
        }

    def test_get_product_api(self):
        response = self.client.get('/api/products/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_post_product_api(self):
        response = self.__create_product()
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_patch_product_api(self):
        response = self.__create_product()
        id = response.json()['id']
        self.edit_product['id'] = id
        response = self.client.patch(f'/api/products/{id}/', self.edit_product)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_delete_product_api(self):
        response = self.__create_product()
        id = response.json()['id']
        response = self.client.delete(f'/api/products/{id}/')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def __create_product(self):
        category = self.client.post('/api/categories/', self.create_category)
        category_id = [category.json()['id']]
        self.create_product['categories'] = category_id
        self.edit_product['categories'] = category_id
        response = self.client.post('/api/products/', self.create_product)

        return response
