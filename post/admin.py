from django.contrib import admin

from .models import Category, Post, Comment

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = (
        "name",
    )

@admin.register(Post)
class CategoryAdmin(admin.ModelAdmin):
    list_display = (
        "title",
        "category",
        "publication_date",
    )

@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = (
        "author_name",
        "post"
    )