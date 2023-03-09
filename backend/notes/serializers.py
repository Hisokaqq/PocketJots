from rest_framework import serializers
from .models import Profile, Note

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['username', 'date_of_creation', 'key', 'id']



class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ['id', 'profile', 'text', 'date_of_creation', 'color']