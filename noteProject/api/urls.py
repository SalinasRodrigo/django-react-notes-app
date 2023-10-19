from django.urls import path
from . import views

urlpatterns = [
  path('', view=views.getRoutes, name="routes"),
  path('notes/', view=views.getNotes, name="notes"),
  path('notes/create/', view=views.createNote, name="create"),
  path('notes/<int:id>/update/', view=views.updateNote, name="update-note"),
  path('notes/<int:id>/delete/', view=views.deleteNote, name="delete-note"),
  path('notes/<int:id>/', view=views.getNote, name="note"),
]