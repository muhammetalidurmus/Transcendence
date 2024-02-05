from django.urls import path
from .views import add_numbers
from .import views

urlpatterns = [
    path('add/', add_numbers, name='add_numbers'),
    path('', views.index),
]
