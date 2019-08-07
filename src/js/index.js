import { createStore }  from 'redux';
import { ADD_TODO, COMPLETE_TODO, addTodo, completeTodo, setVisibiltyFilter, VisibilityFilters } from './actions';
import { todoApp } from './reducers';

const store = createStore(todoApp);

const addForm = document.getElementById('add-form');
const addInput = document.getElementById('add-input');
const todoList = document.getElementById('todo-list');
const a_all = document.getElementById('ALL');
const a_completed = document.getElementById('COMPLETED');
const a_active = document.getElementById('ACTIVE');

const render = () => {
  const state = store.getState();
  const { todos, visibilityFilter } = state;

  while (todoList.hasChildNodes()){
    todoList.removeChild(todoList.firstChild);
  }

  todos.forEach((item, index) => {
    const todo = document.createElement('div');
    todo.innerHTML = item.text;
    todo.style.cssText = item.completed ? 'text-decoration : line-through; cursor : pointer' : 'text-decoration : none; cursor : pointer';

    todo.addEventListener('click', function(){
      store.dispatch(completeTodo(index));
    });

    if(visibilityFilter === VisibilityFilters.SHOW_ALL){
      todoList.appendChild(todo);
    }else if(visibilityFilter === VisibilityFilters.SHOW_COMPLETED){
      if(item.completed){
        todoList.appendChild(todo);
      }
    }else if(visibilityFilter === VisibilityFilters.SHOW_ACTIVE){
      if(!item.completed){
        todoList.appendChild(todo);
      }
    }
    
  });
}

store.subscribe(render);

addForm.addEventListener('submit', function(e){
  e.preventDefault();
  store.dispatch(addTodo(addInput.value));
});

a_all.addEventListener('click', function(e){
  e.preventDefault();
  store.dispatch(setVisibiltyFilter(VisibilityFilters.SHOW_ALL));
});

a_completed.addEventListener('click', function(e){
  e.preventDefault();
  store.dispatch(setVisibiltyFilter(VisibilityFilters.SHOW_COMPLETED));
});

a_active.addEventListener('click', function(e){
  e.preventDefault();
  store.dispatch(setVisibiltyFilter(VisibilityFilters.SHOW_ACTIVE));
});


