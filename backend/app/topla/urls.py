from django.urls import path
from .views import *
from .import views

urlpatterns = [
    path('', views.index),
    path('me/', me, name='me'),
    path('set2fa/', setTwoFactor, name='setTwoFactor'),
    path('validateTwoFactor/', validateTwoFactor, name='validateTwoFactor'),
    path('get_access_token/', get_access_token, name='get_access_token'),
    path('register/', register, name='register'),
    path('loginup/', loginup, name='loginup'),
    path('exituser/', exituser, name='exituser'),
    path('loginstatus/', loginstatus, name='loginstatus'),
    path('update_profile_image/', update_profile_image, name='update_profile_image'),
]
