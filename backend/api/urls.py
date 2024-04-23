from django.urls import path
from . import views

urlpatterns = [
    path("notes/", views.NoteListCreate.as_view(), name="note-list"),
    path("notes/delete/<int:pk>/", views.NoteDelete.as_view(), name="delete-note"),
    path("notes/edit/<int:pk>/", views.NoteEdit.as_view(), name="edit-note"),

    path("folders/", views.FolderListCreate.as_view(), name="folder-list"),
    path("folders/delete/<int:pk>/", views.FolderDelete.as_view(), name="delete-folder"),
]