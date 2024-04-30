from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver

class Note(models.Model):
    title = models.CharField(max_length=100)
    folder = models.CharField(max_length=100)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    # create a foreign key link that links to the User by "notes"
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="notes")

    def __str__(self):
        return self.title

class Folder(models.Model):
    folder = models.CharField(max_length=100)

    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="folders")

class UserStat(models.Model):
    level = models.PositiveSmallIntegerField(default=1)
    exp = models.PositiveSmallIntegerField(default=0)

    user = models.ForeignKey(User, on_delete=models.CASCADE ,related_name="stats")

    # create a signal that creates a UserStat object when a User object is created
    @receiver(post_save, sender=User)
    def create_stats(sender, instance, created, **kwargs):
        if created:
            UserStat.objects.create(user=instance)
