$(document).ready(async function () {
    const $todos = $('.todos');
    const $addTodoBtn = $('#addTodoBtn');
    const $taskInput = $('#task');
    const $userIdInput = $('#userId');

    $addTodoBtn.on('click', async function(event) {
        event.preventDefault();
        // create the object to send to the backend
        const newTodo = {
            task: $taskInput.val(),
            userId: $userIdInput.val(),
        };
        try {
            const createdTodo = await $.post('/api/todos', newTodo);
            const $ul = $('<ul>').addClass('list-group list-group-horizontal');
            const $taskLi = $('<li>').text(createdTodo.task).addClass('list-group-item');
            const $usernameLi = $('<li>').text(createdTodo.username).addClass('list-group-item');
            const $btnLi = $('<li>').addClass('list-group-item');
            const $deleteBtn = $('<button>').text('Delete');
            if (createdTodo.completed) {
                $taskLi.addClass('list-group-item-success');
                $usernameLi.addClass('list-group-item-success');
                $btnLi.addClass('list-group-item-success');
            } else {
                $taskLi.addClass('list-group-item-danger');
                $usernameLi.addClass('list-group-item-danger');
                $btnLi.addClass('list-group-item-danger');
            }
            $btnLi.append($deleteBtn);
            $ul.append($taskLi, $usernameLi, $btnLi);
            $todos.append($ul);
        } catch (e) {
            alert(e);
        }

    })

    try {
        const todos = await $.get('/api/todos');
        todos.forEach(todo => {
            const $ul = $('<ul>').addClass('list-group list-group-horizontal');
            const $taskLi = $('<li>').text(todo.task).addClass('list-group-item');
            const $usernameLi = $('<li>').text(todo.username).addClass('list-group-item');
            const $btnLi = $('<li>').addClass('list-group-item');
            const $deleteBtn = $('<button>').text('Delete');
            if (todo.completed) {
                $taskLi.addClass('list-group-item-success');
                $usernameLi.addClass('list-group-item-success');
                $btnLi.addClass('list-group-item-success');
            } else {
                $taskLi.addClass('list-group-item-danger');
                $usernameLi.addClass('list-group-item-danger');
                $btnLi.addClass('list-group-item-danger');
            }
            $btnLi.append($deleteBtn);
            $ul.append($taskLi, $usernameLi, $btnLi);
            $todos.append($ul);
        });
    } catch (e) {
        alert(e);
    }

});