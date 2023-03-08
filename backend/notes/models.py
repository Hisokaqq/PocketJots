import random
from django.db import models

class Profile(models.Model):
    username = models.CharField(max_length=50, unique=True)
    date_of_creation = models.DateTimeField(auto_now_add=True)
    key = models.CharField(max_length=4, unique=True, blank=True)
    
    def save(self, *args, **kwargs):
        if not self.key:
            self.key = ''.join(random.choices('0123456789', k=4))
        return super().save(*args, **kwargs)

    def __str__(self):
        return str(self.username) + "#" + str(self.key)
    

class Note(models.Model):
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE)
    text = models.TextField(null=True, blank=True, default='')
    date_of_creation = models.DateTimeField(auto_now_add=True)
    color = models.CharField(max_length=50, default='', blank=True)

    def save(self, *args, **kwargs):
        if self.text is None:
            self.text = ''
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{str(self.profile)} + {str(self.text)[:10]}"
