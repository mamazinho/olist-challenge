from rest_framework.test import APITestCase
from rest_framework import status

class MarketPlaceAPITest(APITestCase):

    @classmethod
    def setUpTestData(cls):
        cls.create_mp = {
            'market_place_name': 'Teste MP',
            'market_place_description':'This is a test marketplace',
            'site': 'test.com',
            'contact_email': 'test@test.com',
            'phone_number': 41999996666,
            'technical_contact': 'test',
        }
        cls.edit_mp = {
            'id': 1,
            'market_place_name': 'Teste MP',
            'market_place_description':'This is an edit marketplace',
            'site': 'newtest.com',
            'contact_email': 'test@test.com',
            'phone_number': 41966669999,
            'technical_contact': 'test',
        }

    def test_get_seller_api(self):
        response = self.client.get('/api/market-places/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_post_seller_api(self):
        response = self.client.post('/api/market-places/', self.create_mp)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_patch_seller_api(self):
        response = self.client.post('/api/market-places/', self.create_mp)
        id = response.json()['id']
        response = self.client.patch(f'/api/market-places/{id}/', self.edit_mp)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_delete_seller_api(self):
        response = self.client.post('/api/market-places/', self.create_mp)
        id = response.json()['id']
        response = self.client.delete(f'/api/market-places/{id}/')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)