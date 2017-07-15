from django.http import HttpResponseRedirect
from django.shortcuts import render, get_object_or_404
from django.urls import reverse

from app.forms import TodoForm
from app.models import Todo


def default(request):
    todos = Todo.objects.order_by('is_done').all()
    form = TodoForm()
    return render(request, 'app/index.html', {'todos': todos, 'form': form})


def remove(request, id):
    todo = get_object_or_404(Todo, id=id)
    todo.delete()
    return HttpResponseRedirect(reverse('default'))


def set_done(request, id, value):
    todo = get_object_or_404(Todo, id=id)
    todo.is_done = value
    print(todo.is_done)
    todo.save()
    return HttpResponseRedirect(reverse('default'))


def create_todo(request):
    if request.method == 'POST':
        form = TodoForm(request.POST)
        if form.is_valid():
            form.save()
            return HttpResponseRedirect(reverse('default'))
    else:
        form = TodoForm()
    return render(request, 'app/test.html', {'form': form})
