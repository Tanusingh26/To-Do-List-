const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');

let todos = JSON.parse(localStorage.getItem('todos')) || [];

function renderTodos() {
  list.innerHTML = '';
  todos.forEach((todo, index) => {
    const li = document.createElement('li');
    if (todo.completed) li.classList.add('completed');

    const span = document.createElement('span');
    span.textContent = todo.text;
    span.onclick = () => toggleComplete(index);

    const actions = document.createElement('div');
    actions.className = 'actions';

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '🗑️';
    deleteBtn.onclick = () => deleteTodo(index);

    actions.appendChild(deleteBtn);
    li.appendChild(span);
    li.appendChild(actions);
    list.appendChild(li);
  });

  localStorage.setItem('todos', JSON.stringify(todos));
}

function addTodo(text) {
  if (text.trim() === '') return;
  todos.push({ text, completed: false });
  renderTodos();
}

function deleteTodo(index) {
  todos.splice(index, 1);
  renderTodos();
}

function toggleComplete(index) {
  todos[index].completed = !todos[index].completed;
  renderTodos();
}

form.onsubmit = (e) => {
  e.preventDefault();
  addTodo(input.value);
  input.value = '';
};

renderTodos();
