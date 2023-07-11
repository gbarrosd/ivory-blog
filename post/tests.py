from django.test import TestCase
from post.models import Category, Post
from django.contrib.auth import get_user_model

User = get_user_model()

# Create your tests here.

class BaseTest(TestCase):
    def setUp(self):
        self.user_data={
            'email':'teste@teste.com',
            'password':'testeSenha',
            'first_name': 'teste', 
            'last_name': 'testando'
        }
        self.client.post('/api/register/', data=self.user_data)
        response = self.client.post('/api/token/', data=self.user_data)
        self.token = response.json()["access"]
        self.user = User.objects.get(email=self.user_data['email'])
        self.category = Category.objects.create(name="categoria teste")
        self.post = Post.objects.create(
            user = self.user,
            title = 'post test',
            content = 'texto test',
            category = self.category,
        )
        return super().setUp()
    
class PostTestCase(BaseTest):

    def test_create_post(self):
        response = self.client.post('/api/post/', data = {
            'user':self.user.id,
            'title' : "titulo de postagem teste",
            'content' : "texto de conteudo teste",
            'category' : self.category.id
        },
        HTTP_AUTHORIZATION=f'Bearer {self.token}'
        )
        self.assertEqual(response.status_code, 201)

    def test_create_comment(self):
        response = self.client.post('/api/comment/', data = {
            'post' : self.post.id,
            'author_name' : "Autor Teste",
            'content' : "comentario teste"
        },
        HTTP_AUTHORIZATION=f'Bearer {self.token}'
        )
        self.assertEqual(response.status_code, 201)