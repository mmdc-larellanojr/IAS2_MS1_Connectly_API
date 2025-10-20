from django.contrib import admin
from django.contrib.admin import AdminSite
from django_ratelimit.decorators import ratelimit
from django.utils.decorators import method_decorator


@method_decorator(ratelimit(key='ip', rate='5/5m', method='POST', block=True), name='login')
class RateLimitedAdminSite(AdminSite):
    """Custom admin site with rate limiting on login"""
    pass


# Create an instance of the rate-limited admin site
admin_site = RateLimitedAdminSite(name='ratelimited_admin')
