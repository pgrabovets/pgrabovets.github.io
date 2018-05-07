class TodoControl {
  constructor(todoHtmlElement) {
    this.todoHtmlElement = todoHtmlElement;

    this.htmlElement = document.createElement('div');
    this.htmlElement.className = 'todo-control';

    this.deleteButton = document.createElement('button');
    this.deleteButton.className = 'btn btn-danger btn-sm';
    this.deleteButton.innerHTML = 'Delete';

    this.doneButton = document.createElement('button');
    this.doneButton.className = 'btn btn-light btn-sm mr-2';
    this.doneButton.innerHTML = 'Done';

    this.htmlElement.appendChild(this.doneButton);
    this.htmlElement.appendChild(this.deleteButton);

    this.addListeners();
  }

  addListeners() {
    this.doneButton.addEventListener('click', (e) => {
      this.handleDone();
    });

    this.deleteButton.addEventListener('click', (e) => {
      this.removeTodoElement();
    });
  }

  removeTodoElement() {
    this.todoHtmlElement.remove();
  }

  handleDone() {
    const text = this.todoHtmlElement.getElementsByTagName('span')[0];
    const date = this.todoHtmlElement.getElementsByTagName('span')[1];
    text.className = 'todo-done text-muted';
    date.className = 'todo-done text-muted';
    this.doneButton.setAttribute('disabled', true);
  }
}


class TodoItem {
  constructor(text, date) {
    this.todoText = text;
    this.todoDate = date;
    this.htmlElement = document.createElement('li');
    this.htmlElement.className = 'list-group-item d-flex justify-content-between align-items-center';

    this.htmlElement.todoDate = this.todoDate;
    this.htmlElement.todoText = this.todoText;

    const dateElement = document.createElement('span');
    dateElement.innerHTML = ' (' + this.todoDate.toDateString() + ')';

    const textElement = document.createElement('span');
    textElement.innerHTML = this.todoText;

    this.htmlElement.appendChild(textElement);
    this.htmlElement.appendChild(dateElement);

    const todoControl = new TodoControl(this.htmlElement);
    this.htmlElement.appendChild(todoControl.htmlElement);
  }
}


class TodoList {
  constructor() {
    this.htmlElementId = 'todoList'
    this.htmlElement = document.getElementById(this.htmlElementId);
  }

  addTodo(text, date) {
    const todoItem = new TodoItem(text, date);
    this.htmlElement.appendChild(todoItem.htmlElement);
  }

  showMatched(searchText) {
    const itemList = this.htmlElement.children;
    for (var i = 0; i < itemList.length; i++) {
      const li = itemList[i];
      const todoText = li.getElementsByTagName('span')[0].innerHTML.toLowerCase();

      if (todoText.indexOf(searchText) === -1) {
        itemList[i].classList.remove('d-flex');
        itemList[i].classList.add('d-none');
      } else {
        itemList[i].classList.remove('d-none');
        itemList[i].classList.add('d-flex');
      }
    }
  }

  showTodosdByDate(date) {
    const itemList = this.htmlElement.children;
    for (var i = 0; i < itemList.length; i++) {
      const li = itemList[i];

      const todoDate = li.todoDate.getTime();
      const selectedDate = date.getTime()

      if (todoDate !== selectedDate) {
        itemList[i].classList.remove('d-flex');
        itemList[i].classList.add('d-none');
      } else {
        itemList[i].classList.remove('d-none');
        itemList[i].classList.add('d-flex');
      }
    }
  }

  sortByText() {
    let itemList = [];
    for (var i = 0; i < this.htmlElement.children.length; i++) {
      itemList.push(this.htmlElement.children[i]);
    }

    itemList.sort((a, b) => {
      const text1 = a.getElementsByTagName('span')[0].innerHTML;
      const text2 = b.getElementsByTagName('span')[0].innerHTML;
      if (text1 > text2) {
        return 1;
      } else {
        return -1;
      }
    });

    itemList.forEach((el)=> {
      this.htmlElement.appendChild(el);
    });
  }

  sortByDate() {
    let itemList = [];
    for (var i = 0; i < this.htmlElement.children.length; i++) {
      itemList.push(this.htmlElement.children[i]);
    }

    itemList.sort((a, b) => {
      const date1 = a.todoDate.getTime();
      const date2 = b.todoDate.getTime();
      return date1 - date2;  
    });

    itemList.forEach((el)=> {
      this.htmlElement.appendChild(el);
    });

  }
}

const todoList = new TodoList();


const addTodoFormElement = document.getElementById('addTodoForm');
addTodoFormElement.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = e.target.elements['todoText'].value;
  const date = e.target.elements['todoDate'].valueAsDate;

  todoList.addTodo(text, date);
});

const searchField = document.getElementById('searchField');
searchField.addEventListener('keyup', (e) => {
  todoList.showMatched(searchField.value);
});

const searchByDate = document.getElementById('searchByDate');
searchByDate.addEventListener('change', (e) => {
  todoList.showTodosdByDate(e.target.valueAsDate);
});


const sortByTextButton = document.getElementById('sortByTextBtn');
sortByTextButton.addEventListener('click', (e) => {
  todoList.sortByText();
});

const sortByDateButton = document.getElementById('sortByDateBtn');
sortByDateButton.addEventListener('click', (e) => {
  todoList.sortByDate();
});

