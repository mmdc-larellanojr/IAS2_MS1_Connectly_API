from django_ratelimit.decorators import ratelimit
from django.utils.decorators import method_decorator
from dj_rest_auth.views import LoginView

@method_decorator(ratelimit(key='ip', rate='5/m', method='POST', block=True), name='dispatch')
class RateLimitedLoginView(LoginView):
    pass
