from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer, NoteSerializer, FolderSerializer, UserStatSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Note
from .models import Folder
from .models import UserStat


class NoteListCreate(generics.ListCreateAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # get the user
        user = self.request.user
        # filter through database for only those by user
        return Note.objects.filter(author=user)

    # As we defined author as read only, we need to create the author input below
    # Below checks that the data passed is valid, then adds the author element
    # By pulling the current user through 'self.request.user'
    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(author=self.request.user)
        else:
            print(serializer.errors)


class NoteDelete(generics.DestroyAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self): 
        user = self.request.user 
        return Note.objects.filter(author=user)

class NoteEdit(generics.UpdateAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self): 
        user = self.request.user 
        return Note.objects.filter(author=user)
    
    def perform_update(self, serializer):
        if serializer.is_valid():
            serializer.save(author=self.request.user)
        else:
            print(serializer.errors)

class FolderListCreate(generics.ListCreateAPIView):
    serializer_class = FolderSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # get the user
        user = self.request.user
        # filter through database for only those by user
        return Folder.objects.filter(author=user)

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(author=self.request.user)
        else:
            print(serializer.errors)

class FolderDelete(generics.DestroyAPIView):
    serializer_class = FolderSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self): 
        user = self.request.user 
        return Folder.objects.filter(author=user)


class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

class StatListCreate(generics.ListCreateAPIView):
    serializer_class = FolderSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # get the user
        user = self.request.user
        # filter through database for only those by user
        return UserStat.objects.filter(author=user)

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(author=self.request.user)
        else:
            print(serializer.errors)

class StatEdit(generics.UpdateAPIView):
    serializer_class = UserStatSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self): 
        user = self.request.user 
        return UserStat.objects.filter(author=user)
    
    def perform_update(self, serializer):
        if serializer.is_valid():
            serializer.save(author=self.request.user)
        else:
            print(serializer.errors)