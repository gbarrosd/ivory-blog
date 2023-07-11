from django.contrib import admin
from user.models import CustomUser

@admin.register(CustomUser)
class CustomUserAdmin(admin.ModelAdmin):
    list_display = (
        "email",
        "is_superuser",
        "is_staff",
    )