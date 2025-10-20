from django.contrib import admin
from connectly_backend.admin import admin_site

from .models import Post, Comment, Like, Follow

# Register with both default and custom admin sites
admin.site.register(Post)
admin.site.register(Comment)
admin.site.register(Like)
admin.site.register(Follow)

admin_site.register(Post)
admin_site.register(Comment)
admin_site.register(Like)
admin_site.register(Follow)
