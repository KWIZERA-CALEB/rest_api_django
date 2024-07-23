from rest_framework.decorators import api_view
from rest_framework.response import Response # for returning a response
from todos.models import Todo # model
from rest_framework import status # to give http response
from .serializers import TodoSerializer

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        token['email'] = user.email

        return token

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

@api_view(['GET'])
def getRoutes(request):
    routes = [
        'GET /api',
        'GET /api/todos',
        'GET /api/todo/<id>/',
        'POST /api/add',
        'DELETE /api/delete/todo/<id>/',
        'PUT /api/update/todo/<id>/'
    ]

    return Response(routes)


# Get the todos
@api_view(['GET'])
def getTodos(request):
    todos = Todo.objects.all()
    # serialize the data to json
    serializer = TodoSerializer(todos, many=True)
    json_data = serializer.data
    return Response(json_data, status=status.HTTP_200_OK)


# add todo
@api_view(['POST'])
def addTodo(request):
    serializer = TodoSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    return Response(serializer.data, status=status.HTTP_200_OK)


# delete todo
@api_view(['DELETE'])
def deleteTodo(request, pk):
    todo = Todo.objects.get(id=pk)
    if request.method == 'DELETE':
        todo.delete()

    return Response({'error':'Todo Deleted'}, status=status.HTTP_200_OK)


# Return a specific todo
@api_view(['GET'])
def singleTodo(request, pk):
    todo = Todo.objects.get(id=pk)
    serializer = TodoSerializer(todo, many=False)
    json_data = serializer.data

    return Response(json_data)


# Update a todo
@api_view(['PUT'])
def updateTodo(request, pk):
    todo = Todo.objects.get(id=pk)

    if request.method == 'PUT':
        # collect form data
        serializer = TodoSerializer(todo, data=request.data)
        if serializer.is_valid():
            serializer.save()
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    return Response({'error':'Todo Updated'}, status=status.HTTP_200_OK)