from django.test import TestCase

# Create your tests here.

class CreateUserTestCase(TestCase):
    def setUp(self):
        self.user={
            'email':'teste@teste.com',
            'password':'testeSenha',
            'first_name': 'teste', 
            'last_name': 'testando'
        }

    def test_create_login_user(self):
        response_create = self.client.post('/api/register/', self.user)
        self.assertEqual(response_create.status_code, 201)

        response_login = self.client.post('/api/token/', self.user)
        self.assertEqual(response_login.status_code, 200)