from django.conf.urls import url

from app import views

urlpatterns = [
    url(r'^$', views.default, name='default'),
    url(r'^remove/(?P<id>[0-9]+)$', views.remove, name='remove'),
    url(r'^set-done/(?P<id>[0-9]+)/(?P<value>[0-1]$)', views.set_done, name='set_done'),
    url(r'^create-todo$', views.create_todo, name='create_todo')
]
