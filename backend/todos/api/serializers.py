from rest_framework import serializers
from todos.models import Todo
from django.contrib.auth.models import User

class TodoSerializer(serializers.ModelSerializer):
    title = serializers.CharField(required=True)
    
    class Meta:
        model = Todo
        fields = '__all__'

    def validate_title(self, value):
        if not value.strip():
            raise serializers.ValidationError('Title is required.')
        return value


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
