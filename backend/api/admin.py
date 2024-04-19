from django.contrib import admin

# Register your models here.
from .models import Note

class NoteAdmin(admin.ModelAdmin):
    fields    = ('title', 'body_area', 'content', 'created_at', 'author')

    #list of fields to display in django admin
    list_display = ['title', 'body_area', 'content', 'created_at', 'author']


    #if you want django admin to show the search bar, just add this line
    search_fields = ['title', 'author']

    #to define model data list ordering
    ordering = ('author','title')

admin.site.register(Note, NoteAdmin)