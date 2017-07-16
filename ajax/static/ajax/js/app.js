$(document).ready(function () {
    $.ajax({
        'url': '/api/todo',
        'type': 'get',
        'success': function (data) {
            var todo_list = [];
            if (data) {
                $.each(data, function (index, todo) {
                    todo_list.push(createTodo(todo.id, todo.todo, todo.is_done));
                });
                $('.todo-list').append(todo_list);
                showOrHideLoad();
            }
        },
        'error': function (error) {
            showError(error)
        }
    });

    $('#save-btn').click(function () {
        var todoText = $('#todo-text').val();
        if (todoText.length > 0) {
            showOrHideLoad();
            saveTodo(todoText);
        }
    });

    $('#todo-text').keypress(function (e) {
        var text = $(this).val();
        if (e.which == 13 && text.length > 0) {
            showOrHideLoad();
            saveTodo(text);
        }
    });
});

function saveTodo(todo) {
    $.ajax({
        'url': '/api/todo',
        'type': 'post',
        'data': {'todo': todo},
        'success': function (data) {
            var todo = createTodo(data.id, data.todo, data.is_done);
            $('.todo-list').before(todo);
            $('#todo-text').val('');
            showOrHideLoad();
        },
        'error': function (error) {
            showError(error)
        }
    });
}

function todoHoverOver() {
    var checkbox = $(this).find('.is-done');
    $(checkbox).show();
}

function todoHoverOut() {
    var checkbox = $(this).find('.is-done');
    $(checkbox).hide();
}

function setDone() {
    var id = $(this).parent('.todo').data('id');
    var value = $(this).is(':checked');
    $.ajax({
        'url': '/api/todo/update/' + id,
        'type': 'patch',
        'data': {'is_done': value},
        'success': function (data) {
            if (data.is_done) {
                $(this).parent('.todo').find('.todo-text p').addClass('todo-success');
            } else {
                $(this).parent('.todo').find('.todo-text p').removeClass('todo-success');
            }
        }.bind(this)
    })
}

function createTodo(id, todo, done) {
    var todoElement = document.createElement('div');
    $(todoElement).addClass('todo row');
    $(todoElement).hover(todoHoverOver, todoHoverOut);
    $(todoElement).attr('data-id', id);

    var doneInput = document.createElement('input');
    if (done) {
        $(doneInput).attr('checked', 'checked');
    }
    $(doneInput).attr('type', 'checkbox');
    $(doneInput).addClass('form-control is-done');
    $(doneInput).click(setDone);
    $(todoElement).append(doneInput);

    var todoTextElement = document.createElement('div');
    $(todoTextElement).addClass('col-md-9 todo-text');
    var text = document.createElement('p');
    $(text).focusout(updateTodo);
    $(text).attr('data-todo', todo);
    $(text).attr('contenteditable', 'true');
    $(text).text(todo);
    if (done) {
        $(text).addClass('todo-success');
    }
    $(todoTextElement).append(text);
    $(todoElement).append(todoTextElement);

    var todoRemoveElement = document.createElement('div');
    $(todoRemoveElement).addClass('col-md-2 remove-block');
    var removeBtn = document.createElement('button');
    $(removeBtn).click(removeTodo);
    $(removeBtn).addClass('btn btn-link remove-btn');
    var removeIcon = document.createElement('i');
    $(removeIcon).addClass('glyphicon glyphicon-remove');
    $(removeBtn).html(removeIcon);
    $(todoRemoveElement).append(removeBtn);
    $(todoElement).append(todoRemoveElement);

    return todoElement;
}

function updateTodo() {
    var newTodo = $(this).text();
    var id = $(this).parent('div').parent('.todo').data('id');
    if (newTodo != $(this).data('todo') && newTodo.length != 0) {
        $.ajax({
            url: '/api/todo/update/' + id,
            type: 'patch',
            data: {todo: newTodo},
            success: function () {
                $(this).attr('data-todo', newTodo);
            }.bind(this),
            error: function (error) {
                $(this).text($(this).data('todo'));
                showError(error);
            }.bind(this)
        });
    } else if (newTodo.length == 0) {
        $(this).text($(this).data('todo'));
    }
}

function showOrHideLoad() {
    if ($('#load-page').is(':visible')) {
        $('#load-page').hide();
        $('.content').show();
    } else {
        $('#load-page').show();
        $('.content').hide();
    }
}

function removeTodo() {
    showOrHideLoad();
    var id = $(this).parent('div').parent('.todo').data('id');
    var todo = $(this).parent('div').parent('.todo');
    $.ajax({
        'url': '/api/todo/delete/' + id,
        'type': 'delete',
        'success': function () {
            $(todo).remove();
            showOrHideLoad();
        },
        'error': function (error) {
            showError(error)
        }
    })
}

function showError(error) {
    $('#ajax-error').show();
    $('#ajax-error #error-text').text('Error! ' + error.status + ' ' + error.statusText);
    $('#ajax-error').hide(3000);
}