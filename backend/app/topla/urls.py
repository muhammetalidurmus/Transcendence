from django.urls import path
from .views import get_access_token, register
from .import views

urlpatterns = [
    path('', views.index),
    path('add/', get_access_token, name='get_access_token'),
    path('register/', register, name='register'),
]
