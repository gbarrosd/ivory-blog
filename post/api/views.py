from rest_framework import permissions, viewsets, mixins, filters, status, response, generics
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.decorators import action
from post.api.mixins import GetSerializerClassMixin

from post.api.serializers import (
    PostListSerializer,
    PostCreateSerializer,
    PostRetrieveSerializer,
    CommentSerializer
)
from post.models import (
    Post, 
    Comment
)

class PostViewSet(
    GetSerializerClassMixin,
    viewsets.ModelViewSet
):
    queryset = Post.objects.all()
    serializer_class = PostListSerializer
    serializer_action_classes = {
        "list": PostListSerializer,
        "retrieve": PostRetrieveSerializer,
        "create": PostCreateSerializer,
    }
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filter_backends = [filters.SearchFilter, DjangoFilterBackend]
    filterset_fields = {
        "publication_date": ['gte', 'lte'], 
        "category_id": ["exact"],
    }
    search_fields = ["title", "content",]


class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer