from django import forms
from django.contrib import admin
from app.models import Message


class MessageAdmin(admin.ModelAdmin):
    # The forms to add and change user instances
    fieldsets = [
        ('Info', {'fields': ['sender', 'message', 'date', 'item']}),
    ]
    # inlines = [ChoiceInline]
    list_display = ('sender', 'message', 'date', 'item')
    list_filter = ['sender']
    search_fields = ['sender', 'item']

admin.site.register(Message, MessageAdmin)