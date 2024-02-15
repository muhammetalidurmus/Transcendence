from django.urls import path
from .views import get_access_token
from .import views

urlpatterns = [
    path('add/', get_access_token, name='get_access_token'),
    path('', views.index),
]
