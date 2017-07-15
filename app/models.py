from django.db import models


class Todo(models.Model):
    id = models.AutoField(primary_key=True)
    todo = models.CharField(max_length=255, null=False)
    is_done = models.BooleanField(default=False, null=False)
