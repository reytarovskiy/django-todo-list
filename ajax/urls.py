from django.conf.urls import url

from ajax import views

urlpatterns = [
    url(r'^$', views.default, name='ajax.default')
]
