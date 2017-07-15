from django.conf.urls import url
from api.views import TodoList, TodoDelete, TodoUpdate

urlpatterns = [
    url(r'^todo$', TodoList.as_view(), name='todo-list'),
    url(r'^todo/delete/(?P<pk>[0-9]+)$', TodoDelete.as_view(), name='todo-delete'),
    url(r'^todo/update/(?P<pk>[0-9]+)$', TodoUpdate.as_view(), name='todo-update')
]
