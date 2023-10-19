from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Note
from .serializers import NoteSerializer

@api_view(['GET'])
def getRoutes(request):
    routes = [
        {
            "Endpoint": "/notes/",
            "method": "GET",
            "body": None,
            "description": "Returns an array of notes",
        },
        {
            "Endpoint": "/notes/id",
            "method": "GET",
            "body": None,
            "description": "Returns a single note object",
        },
        {
            "Endpoint": "/notes/create/",
            "method": "POST",
            "body": {"body": ""},
            "description": "Creates new note with data sent in post request",
        },
        {
            "Endpoint": "/notes/id/update/",
            "method": "PUT",
            "body": {"body": ""},
            "description": "Creates an existing note with data sent in post request",
        },
        {
            "Endpoint": "/notes/id/delete/",
            "method": "DELETE",
            "body": None,
            "description": "Deletes and exiting note",
        },
    ]
    return Response(routes)

@api_view(['GET'])
def getNotes(request):
    notes = Note.objects.all().order_by('-updated')
    serialNotes = NoteSerializer(notes, many=True)
    return Response(serialNotes.data)

@api_view(['GET'])
def getNote(request, id):
    notes = Note.objects.get(id=id)
    serialNotes = NoteSerializer(notes, many=False)
    return Response(serialNotes.data)

@api_view(['PUT'])
def updateNote(request, id):
    data = request.data
    note = Note.objects.get(id=id)
    serialNotes = NoteSerializer(instance = note, data = data)
    if serialNotes.is_valid():
        serialNotes.save()

    return Response(serialNotes.data)

@api_view(['DELETE'])
def deleteNote(request, id):
    note = Note.objects.get(id=id)
    note.delete()
    return Response('note was delete')

@api_view(['POST'])
def createNote(request):
    data = request.data
    print(request)
    note = Note.objects.create(body = data["body"])
    serializer = NoteSerializer(note, many = False)
    return Response()