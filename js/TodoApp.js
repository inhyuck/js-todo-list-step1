export default function TodoApp({ selector }) {
  const $todoApp = document.querySelector(selector);

  $todoApp.innerHTML = `
        <div class="todoapp">
        <h1>TODOS</h1>
        <input
        id="new-todo-title"
        class="new-todo"
        placeholder="할일을 추가해주세요"
        autofocus
        />
        <main>
        <input class="toggle-all" type="checkbox" />
        <ul id="todo-list" class="todo-list"></ul>
        <div class="count-container">
            <span class="todo-count">총 <strong>0</strong> 개</span>
            <ul class="filters">
            <li>
                <a class="all selected" href="/#">전체보기</a>
            </li>
            <li>
                <a class="active" href="#active">해야할 일</a>
            </li>
            <li>
                <a class="completed" href="#completed">완료한 일</a>
            </li>
            </ul>
        </div>
        </main>
    </div>
    `;

    (() => {
        const newTodoElem = document.querySelector('#new-todo-title');
        const todoListElem = document.querySelector('#todo-list');

        newTodoElem.addEventListener('keypress', event => {
          if (event.key === 'Enter') {
            if (newTodoElem.value === '') {
              return;
            }

            const newTodoTitle = newTodoElem.value;
            const todoItemElem = document.createElement('li');              
            todoListElem.appendChild(todoItemElem);

            todoItemElem.innerHTML = `
              <div class="view">
                <input class="toggle" type="checkbox"/>
                <label class="label">${newTodoTitle}</label>
                <button class="destroy"></button>
              </div>
              <input class="edit" value="${newTodoTitle}" />
            `;
            newTodoElem.value = '';

            const toggleElem = todoItemElem.querySelector('.toggle');
            toggleElem.addEventListener('change', event => {
              if (event.target.checked) {
                todoItemElem.classList.add('completed');
                toggleElem.setAttribute('checked', '');

              } else {                  
                todoItemElem.classList.remove('completed');
                toggleElem.removeAttribute('checked');
              }
            });

            const DestoryElem = todoItemElem.querySelector('.destroy');
            DestoryElem.addEventListener('click', () => {
              todoListElem.removeChild(todoItemElem);
            });

            todoItemElem.addEventListener('dblclick', () => {
              todoItemElem.classList.add('editing');
            });
            const editElem = todoItemElem.querySelector('.edit');
            const labelElem = todoItemElem.querySelector('.label');
            editElem.addEventListener('keypress', event => {
              if (event.key === 'Enter') {
                labelElem.innerHTML = editElem.value;
                todoItemElem.classList.remove('editing');

              } else if (event.key === 'Escape') {
                editElem.value = newTodoTitle;
                todoItemElem.classList.remove('editing');
              }
            });
          }
        });

      })();
}
