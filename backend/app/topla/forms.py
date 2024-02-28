from django import forms
from .models import ecole

class EcoleForm(forms.ModelForm):
    class Meta:
        model = ecole
        fields = ['username', 'first_name', 'last_name', 'email', 'country', 'city', 'password', 'profile_image']