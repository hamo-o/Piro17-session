from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.

class User(AbstractUser):
    GENDER_CHOCIE = (
        ("FEMALE", "female"),
        ("MALE", "male"),
        ("ETC", "etc"),
    )
    desc = models.CharField(max_length=255, null=True, blank=True)
    avatar = models.ImageField(null=True, blank=True)
    gender = models.CharField(max_length=20, choices=GENDER_CHOCIE)
    birthday = models.DateField(null=True)