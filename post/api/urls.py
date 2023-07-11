from rest_framework.routers import SimpleRouter, DefaultRouter
from post.api.views import (
    PostViewSet,
    CommentViewSet
)

router = DefaultRouter(trailing_slash=False)

router.register(r"post", PostViewSet, basename='post')
router.register(r"comment", CommentViewSet, basename='comment')
