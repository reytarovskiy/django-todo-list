from rest_framework import serializers

from app.models import Todo


class TodoSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Todo
        fields = ('id', 'todo', 'is_done')
