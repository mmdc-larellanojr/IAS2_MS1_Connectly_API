from django.contrib import admin
from django.urls import path, include
from django.views.generic.base import RedirectView
from django_ratelimit.decorators import ratelimit
from dj_rest_auth.views import (
    LogoutView, PasswordChangeView, PasswordResetConfirmView,
    PasswordResetView, UserDetailsView,
)
from .auth_views import RateLimitedLoginView


# Define the auth URLs manually to apply robust ratelimit to the login view
auth_urlpatterns = [
    path('login/', RateLimitedLoginView.as_view(), name='rest_login'),
    path('logout/', LogoutView.as_view(), name='rest_logout'),
    path('user/', UserDetailsView.as_view(), name='rest_user_details'),
    path('password/change/', PasswordChangeView.as_view(), name='rest_password_change'),
    path('password/reset/', PasswordResetView.as_view(), name='rest_password_reset'),
    path('password/reset/confirm/', PasswordResetConfirmView.as_view(), name='rest_password_reset_confirm'),
]

urlpatterns = [
    path('', RedirectView.as_view(url='/api/', permanent=False)),
    path('admin/', admin.site.urls),
    path('api/auth/', include(auth_urlpatterns)),
    path('api/auth/registration/', include('dj_rest_auth.registration.urls')),
    path('api/', include('posts.urls')),  # our posts/newsfeed endpoints
]
