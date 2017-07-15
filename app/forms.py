from django.forms import ModelForm, TextInput

from app.models import Todo


class TodoForm(ModelForm):
    class Meta:
        model = Todo
        fields = {'todo'}

        widgets = {
            'todo': TextInput({'class': 'form-control', 'placeholder': 'Todo'})
        }