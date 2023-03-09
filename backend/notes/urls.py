from django.urls import path
from . import views

urlpatterns = [
    path("profiles/", views.get_profiles, name="profiles"),
    path("profiles/login/", views.reg_log, name="login"),
    path("profiles/create/", views.create_profile, name="create_profile"),
    path("profiles/delete/<int:pk>/", views.delete_profile, name="delete_profile"),
    path("profiles/<int:pk>/", views.get_profile, name="get_profile"),
    path("notes/", views.get_notes, name="notes"),
    path("notes/delete/<int:pk>/", views.delete_note_by_id, name="delete_profile"),
    path("notes/update/<int:pk>/", views.update_note_text, name="update_note_text"),
    path("notes/create/", views.create_note, name="delete_profile"),
    path("notes/profile/<int:pk>/", views.get_profile_notes, name="notes_profile"),
    path("notes/<int:pk>/", views.get_note_by_id, name="note-detail"),
]
