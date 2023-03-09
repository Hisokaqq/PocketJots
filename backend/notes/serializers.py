from rest_framework import serializers
from .models import Profile, Note

class ProfileSerializer(serializers.ModelSerializer):
    notes_count = serializers.SerializerMethodField()

    def get_notes_count(self, obj):
        return obj.note_set.count()

    class Meta:
        model = Profile
        fields = ['username', 'date_of_creation', 'key', 'id', 'notes_count']



class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ['id', 'profile', 'text', 'date_of_creation', 'color']