from django.contrib.auth.models import Permission
from rest_framework import serializers
from app.models import Message

import json

class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = ('id', 'sender', 'date', 'message','item')
        read_only_fields = ('id',)