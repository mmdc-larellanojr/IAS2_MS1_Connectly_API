from django.contrib import admin
from connectly_backend.admin import admin_site

from .models import User

# Register with both default and custom admin sites
admin.site.register(User)
admin_site.register(User)
