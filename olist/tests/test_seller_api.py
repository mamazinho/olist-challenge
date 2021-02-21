from rest_framework.test import APITestCase
from rest_framework import status

class AthleteAPITest(APITestCase):

    @classmethod
    def setUpTestData(cls):
        cls.create_seller = {
            'nick_name': 'Test seller',
            'corporate_name': 'We will be the best sellers in the world',
            'seller_cnpj': 12345678901234,
            'contact_email': 'test@test.com',
            'phone_number': 41999996666,
            'address': 'test street',
        }
        cls.edit_seller = {
            'id': 1,
            'nick_name': 'Test seller edit',
            'corporate_name': 'We ate the best sellers in the world',
            'seller_cnpj': 12345678901234,
            'contact_email': 'test@test.com',
            'phone_number': 41999996666,
            'address': 'test street',
        }

    def test_get_seller_api(self):
        response = self.client.get('/api/sellers/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_post_seller_api(self):
        response = self.client.post('/api/sellers/', self.create_seller)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_patch_seller_api(self):
        response = self.client.post('/api/sellers/', self.create_seller)
        id = response.json()['id']
        response = self.client.patch(f'/api/sellers/{id}/', self.edit_seller)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_delete_seller_api(self):
        response = self.client.post('/api/sellers/', self.create_seller)
        id = response.json()['id']
        response = self.client.delete(f'/api/sellers/{id}/')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)