from django.urls import path
from . import views

urlpatterns = [
    path('', views.getRoutes),
    path('todos/', views.getTodos),
    path('add/', views.addTodo),
    path('delete/todo/<str:pk>/', views.deleteTodo),
    path('todo/<str:pk>/', views.singleTodo),
    path('update/todo/<str:pk>/', views.updateTodo)
]