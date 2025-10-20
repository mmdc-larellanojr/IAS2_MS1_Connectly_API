from django.http import JsonResponse


def ratelimited_error(request, exception=None):
    """
    Custom view to handle rate limit exceeded (429 Too Many Requests).
    """
    return JsonResponse(
        {'error': 'Rate limit exceeded. Please try again later.'},
        status=429
    )
