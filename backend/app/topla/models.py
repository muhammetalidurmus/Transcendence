from django.db import models

class ecole(models.Model):
    username = models.CharField(max_length=60, default='none')
    first_name = models.CharField(max_length=60, default='none')
    last_name = models.CharField(max_length=60, default='none')
    email = models.CharField(max_length=60, default='none')
    country = models.CharField(max_length=60, default='none')
    city = models.CharField(max_length=60, default='none')
    password = models.CharField(max_length=100, default='none')
    profile_image = models.ImageField(upload_to='profile_images/', default='profile_images/default.jpg')
    two_factor_code = models.PositiveIntegerField(default=0)  # 4 haneli sayı
    enable2f = models.BooleanField(default=False)  # True ya da False değeri alacak
    loginIn = models.CharField(max_length=8, default='False')

    def __str__(self):
        return f"Username: {self.username}, Name: {self.first_name} {self.last_name}, Country: {self.country}, loginIn: {self.loginIn}"