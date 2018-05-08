from django.conf.urls import url, include
from rest_framework.routers import DefaultRouter 
from rest_framework import renderers

from app import views as app_views

# Create a router and register our viewsets with it.
router = DefaultRouter()

router.register(r'', app_views.MessageViewSet)

# The API URLs are now determined automatically by the router.
# Additionally, we include the login URLs for the browsable API.
# app_name = 'users'
urlpatterns = [
    url(r'^', include(router.urls)),
    # url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    # url(r'^auth/', include('rest_framework_social_oauth2.urls')),
]

# urlpatterns += router.urls
