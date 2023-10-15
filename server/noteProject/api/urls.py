from django.urls import path
from . import views

urlpatterns = [
  path('', view=views.getRoutes, name="routes"),
  path('notes/', view=views.getNotes, name="notes"),
  path('notes/<int:id>/', view=views.getNote, name="note"),
]