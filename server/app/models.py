from django.db import models
from django.utils import timezone
from django.conf import settings
from django.utils.timezone import now

from django.core.files.storage import FileSystemStorage
from time import time
import datetime


import os


class Message(models.Model):       
    
    sender = models.CharField(max_length=200, null=True)
    date = models.DateTimeField(default=timezone.now, null=True)
    message = models.TextField()
    item = models.CharField(max_length=200, null=True)