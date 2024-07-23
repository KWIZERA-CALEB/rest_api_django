from django.urls import path
from . import views

from .views import MyTokenObtainPairView

from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns = [
    path('', views.getRoutes),
    path('todos/', views.getTodos),
    path('add/', views.addTodo),
    path('delete/todo/<str:pk>/', views.deleteTodo),
    path('todo/<str:pk>/', views.singleTodo),
    path('update/todo/<str:pk>/', views.updateTodo),
    path('register/', views.register),

    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]