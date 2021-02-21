from rest_framework.test import APITestCase
from rest_framework import status

class AthleteAPITest(APITestCase):

    @classmethod
    def setUpTestData(cls):
        cls.create_category = {
            'category_name': 'Test category',
            'category_description': 'This is a test category',
        }
        cls.edit_category = {
            'id': 1,
            'category_name': 'Test category',
            'category_description': 'This is a test category',
        }

    def test_get_category_api(self):
        response = self.client.get('/api/categories/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_post_category_api(self):
        response = self.client.post('/api/categories/', self.create_category)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_patch_category_api(self):
        response = self.client.post('/api/categories/', self.create_category)
        id = response.json()['id']
        response = self.client.patch(f'/api/categories/{id}/', self.edit_category)
        self.assertEqual(response.status_code, status.HTTP_200_OK)