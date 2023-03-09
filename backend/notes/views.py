from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Profile, Note
from .serializers import ProfileSerializer, NoteSerializer

@api_view(["GET"])
def get_profiles(request):
    profiles = Profile.objects.all()
    serializer = ProfileSerializer(profiles, many=True)
    return Response(serializer.data)

@api_view(["GET"])
def get_profile(request, pk):
    try:
        profile = Profile.objects.get(pk=pk)
    except Profile.DoesNotExist:
        return Response({"error": "Profile does not exist"}, status=status.HTTP_404_NOT_FOUND)
    
    serializer = ProfileSerializer(profile)
    return Response(serializer.data)


@api_view(["POST"])
def create_profile(request):
    serializer = ProfileSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(["DELETE"])
def delete_profile(request, pk):
    try:
        profile = Profile.objects.get(pk=pk)
    except Profile.DoesNotExist:
        return Response({'error': 'Profile does not exist'}, status=status.HTTP_404_NOT_FOUND)
    
    profile.delete()
    return Response({"message": f"user under pk {pk} was deleted"},status=status.HTTP_204_NO_CONTENT)



@api_view(['POST'])
def reg_log(request):
    # Check if request data contains username
    if 'username' not in request.data:
        return Response({'error': 'Please provide username'}, status=status.HTTP_400_BAD_REQUEST)

    # Check if request data contains key
    if 'key' in request.data:
        try:
            profile = Profile.objects.get(username=request.data['username'], key=request.data['key'])
            serializer = ProfileSerializer(profile)
            return Response(serializer.data)
        except Profile.DoesNotExist:
            return Response({'error': 'Invalid username or key'}, status=status.HTTP_404_NOT_FOUND)

    # Check if profile with username already exists
    if Profile.objects.filter(username=request.data['username']).exists():
        return Response({'error': 'Profile with this username already exists.'}, status=status.HTTP_400_BAD_REQUEST)

    # Create new profile with username
    serializer = ProfileSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



# Notes


@api_view(["GET"])
def get_notes(request):
    notes = Note.objects.all()
    serializer = NoteSerializer(notes, many=True)
    return Response(serializer.data)


@api_view(["GET"])
def get_note_by_id(request, pk):
    try:
        note = Note.objects.get(pk=pk)
    except Note.DoesNotExist:
        return Response({"error": "Note does not exist"}, status=status.HTTP_404_NOT_FOUND)

    serializer = NoteSerializer(note)
    return Response(serializer.data)


@api_view(["POST"])
def create_note(request):
    user_id = request.data.get('user_id')
    if not user_id:
        return Response({'error': 'user_id not provided'}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        profile = Profile.objects.get(pk=user_id)
        
    except Profile.DoesNotExist:
        return Response({'error': 'Profile does not exist'}, status=status.HTTP_404_NOT_FOUND)
    
    text = request.data.get('text')
    color = request.data.get('color')
    note = Note.objects.create(profile=profile, text=text, color=color)

    return Response({"message": "note created"})

@api_view(['PUT'])
def update_note_text(request, pk):
    try:
        note = Note.objects.get(pk=pk)
    except Note.DoesNotExist:
        return Response({'error': 'Note not found'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'PUT':
        serializer = NoteSerializer(note, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)




@api_view(["DELETE"])
def delete_note_by_id(request, pk):
    try:
        note = Note.objects.get(pk=pk)
    except Note.DoesNotExist:
        return Response({'error': 'Note does not exist'}, status=status.HTTP_404_NOT_FOUND)

    note.delete()
    return Response({"message": f"note under pk {pk} was deleted"}, status=status.HTTP_204_NO_CONTENT)

@api_view(['GET'])
def get_profile_notes(request, pk):
    try:
        profile = Profile.objects.get(pk=pk)
    except Profile.DoesNotExist:
        return Response({'error': 'Profile not found'}, status=status.HTTP_404_NOT_FOUND)

    search = request.query_params.get('search')
    notes = Note.objects.filter(profile=profile)

    if search:
        notes = notes.filter(text__icontains=search)

    if request.method == 'GET':
        serializer = NoteSerializer(notes, many=True)
        return Response(serializer.data[::-1])
