from django.contrib import admin
from .models import ecole
from django.contrib.admin.views.decorators import staff_member_required

# Register your models here.
admin.site.register(ecole)

admin.autodiscover()