from django.contrib import admin

# Register your models here.
from .models import Note
from .models import Folder

class NoteAdmin(admin.ModelAdmin):
    fields    = ('title', 'category', 'content', 'created_at', 'author')

    #list of fields to display in django admin
    list_display = ['title', 'category', 'content', 'created_at', 'author']

    #if you want django admin to show the search bar, just add this line
    search_fields = ['title', 'author']

    #to define model data list ordering
    ordering = ('author','title')


admin.site.register(Note, NoteAdmin)

class FolderAdmin(admin.ModelAdmin):
    fields    = ('folder', 'author')

    #list of fields to display in django admin
    list_display = ['folder', 'author']

    #if you want django admin to show the search bar, just add this line
    search_fields = ['folder', 'author']

    #to define model data list ordering
    ordering = ('author','folder')

admin.site.register(Folder, FolderAdmin)

