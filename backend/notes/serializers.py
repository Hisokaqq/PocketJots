from rest_framework import serializers
from .models import Profile, Note

class ProfileSerializer(serializers.ModelSerializer):
    num_notes = serializers.SerializerMethodField()

    class Meta:
        model = Profile
        fields = ['id', 'username', 'date_of_creation', 'key', 'num_notes']

    def get_num_notes(self, profile):
        return profile.note_set.count()


class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ['id', 'profile', 'text', 'date_of_creation', 'color']