from rest_framework.test import APITestCase
from rest_framework import status

class AthleteAPITest(APITestCase):

    @classmethod
    def setUpTestData(cls):
        cls.create_category = {
            'category_name': 'Test category',
            'category_description': 'This is a test category',
        }

    def test_get_category_api(self):
        response = self.client.get('/api/events/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_post_category_api(self):
        response = self.client.post('/api/events/', self.create_events)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_put_category_api(self):
        response = self.client.post('/api/events/', self.create_events)
        id = response.json()['id']
        response = self.client.put(f'/api/events/{id}/', self.edit_event)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_patch_category_api(self):
        response = self.client.post('/api/events/', self.create_events)
        id = response.json()['id']
        response = self.client.patch(f'/api/events/{id}/', self.patch_event)
        self.assertEqual(response.status_code, status.HTTP_200_OK)