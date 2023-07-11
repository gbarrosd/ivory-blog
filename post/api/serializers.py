from rest_framework import serializers
from django.db import transaction
from rest_framework import response, status
from post.api.mixins import PublicationDateMixin
from post.models import (
    Post, 
    Comment
)

from user.api.serializers import (
    UserListSerializer
)

class PostListSerializer(PublicationDateMixin, serializers.ModelSerializer):
    user = UserListSerializer()
    publication_date = serializers.SerializerMethodField()
    
    class Meta:
        model = Post
        fields = ("id", "title", "publication_date", "category", "user")
        depth = 1

class PostCreateSerializer(serializers.ModelSerializer):

    class Meta:
        model = Post
        fields = ("__all__")

class PostRetrieveSerializer(PublicationDateMixin, serializers.ModelSerializer):
    user = UserListSerializer()
    publication_date = serializers.SerializerMethodField()
    
    class Meta:
        model = Post
        fields = ("id", "title", "publication_date", "content", "comments", "category", "user")
        depth = 1

class CommentSerializer(PublicationDateMixin, serializers.ModelSerializer):
    publication_date = serializers.SerializerMethodField()
    
    class Meta:
        model = Comment
        fields = "__all__"
