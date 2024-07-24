from rest_framework import serializers
from todos.models import Todo
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password

class TodoSerializer(serializers.ModelSerializer):
    title = serializers.CharField(required=True)
    owner = serializers.ReadOnlyField(source='owner.username')
    
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
        fields = ('username', 'password', 'email')  # Add other fields as necessary
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        validated_data['password'] = make_password(validated_data['password'])
        return super(UserSerializer, self).create(validated_data)