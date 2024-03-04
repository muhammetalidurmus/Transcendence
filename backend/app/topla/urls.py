from django.urls import path
from .views import get_access_token, register, loginup, update_profile_image, exituser, loginstatus
from .import views

urlpatterns = [
    path('', views.index),
    path('add/', get_access_token, name='get_access_token'),
    path('register/', register, name='register'),
    path('loginup/', loginup, name='loginup'),
    path('exituser/', exituser, name='exituser'),
    path('loginstatus/', loginstatus, name='loginstatus'),
    path('update_profile_image/', update_profile_image, name='update_profile_image'),
]
