from rest_framework.decorators import api_view
from rest_framework.response import Response # for returning a response
from todos.models import Todo # model
from rest_framework import status # to give http response
from .serializers import TodoSerializer

@api_view(['GET'])
def getRoutes(request):
    routes = [
        'GET /api',
        'GET /api/todos',
        'POST /api/add'
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
    return Response(serializer.data, status=status.HTTP_200_OK)

# delete todo
@api_view(['POST'])
def deleteTodo(request, pk):
    todo = Todo.objects.get(id=pk)
    if request.method == 'POST':
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
@api_view(['POST'])
def updateTodo(request, pk):
    todo = Todo.objects.get(id=pk)

    if request.method == 'POST':
        # collect form data
        serializer = TodoSerializer(todo, data=request.data)
        if serializer.is_valid():
            serializer.save()
    
    return Response({'error':'Todo Updated'}, status=status.HTTP_200_OK)