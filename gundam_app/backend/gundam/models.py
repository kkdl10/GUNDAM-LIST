from django.db import models

class Gundam(models.Model):
    CATEGORY_CHOICES = [
        ('SD', 'Super Deformed'),
        ('HG', 'High Grade'),
        ('RG', 'Real Grade'),
        ('MG', 'Master Grade'),
        ('PG', 'Perfect Grade'),
        ('Mega', 'Mega Size'),
    ]
    name = models.CharField(max_length=100)
    category = models.CharField(max_length=10, choices=CATEGORY_CHOICES)
    image_url = models.URLField()

    def __str__(self):
        return self.name
from django.contrib.auth.models import User
from django.db import models

class GundamChecklist(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    gundam_id = models.IntegerField()
    is_favorite = models.BooleanField(default=False)
    is_wishlist = models.BooleanField(default=False)
    is_owned = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.user.username} - Gundam {self.gundam_id}"
