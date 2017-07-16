from rest_framework import generics
from api.serializers import TodoSerializer
from app.models import Todo


class TodoList(generics.ListCreateAPIView):
    queryset = Todo.objects.order_by('is_done').all()
    model = Todo
    serializer_class = TodoSerializer


class TodoDelete(generics.DestroyAPIView):
    queryset = Todo.objects.all()
    model = Todo
    serializer_class = TodoSerializer


class TodoUpdate(generics.UpdateAPIView):
    queryset = Todo.objects.all()
    model = Todo
    serializer_class = TodoSerializer
