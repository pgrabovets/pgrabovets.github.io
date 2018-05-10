function  createElement(type, config) {
  const htmlElement = document.createElement(type);

  if (config.className) {
    htmlElement.className = config.className;
  }

  if (config.content) {
    htmlElement.innerHTML = config.content;
  }

  if (config.children) {
    if (Array.isArray(config.children)) {
      config.children.forEach((el) => {
        htmlElement.appendChild(el);
      });
    } else {
      htmlElement.appendChild(config.children);
    }
  }

  return htmlElement; 
}


class TodoForm {
  constructor(config) {
    this.config = config;

    this.elem = document.getElementById(this.config.formId);
    this.textInput = document.getElementById(this.config.textInputId);
    this.dateInput = document.getElementById(this.config.dateInputId);

    this.onAddTodo = null;
    
    this.addListeners();
  }

  addListeners() {
    this.textInput.addEventListener('keyup', this.handleTextChange.bind(this));
    this.dateInput.addEventListener('change', this.handleDateChange.bind(this));
    this.elem.addEventListener('submit', this.handleAddTodo.bind(this));
  }

  handleAddTodo(e) {
    e.preventDefault();

    if (this.isInputsNotEmpty()) {
      const text = this.getText();
      const date = this.getDate();
      this.onAddTodo(text, date);
     
    } else {
      if (!this.textInput.value) {
        this.textInput.classList.add('is-invalid');
      }

      if (!this.dateInput.valueAsDate) {
        this.dateInput.classList.add('is-invalid');
      }
    }
    
  }

  handleTextChange(e) {
    this.textInput.classList.remove('is-invalid');
  }

  handleDateChange(e) {
    this.dateInput.classList.remove('is-invalid');
  }

  getText() {
    return this.textInput.value;
  }

  getDate() {
    return this.dateInput.valueAsDate;
  }

  isInputsNotEmpty() {
    return this.textInput.value && this.dateInput.valueAsDate;
  }

}


class TodoItem {
  constructor(text, date) {
    const textElem =  createElement('span', {
      className: 'todo-content',
      content: text
    });

    const dateElem =  createElement('span', {
      className: 'todo-content',
      content: ' (' + date.toDateString() + ')'
    });

    this.todoContent = createElement('div', {
      className: 'todo-content',
      children: [textElem, dateElem]
    });

    this.deleteButton = createElement('button', {
      className: 'btn btn-danger btn-sm',
      content: 'Delete'
    });

    this.doneButton = createElement('button', {
      className: 'btn btn-light btn-sm mr-2',
      content: 'Done'
    });

    this.todoControl = createElement('div', {
      className: 'todo-control',
      children: [this.doneButton, this.deleteButton]
    });

    this.elem = createElement('li', {
      className: 'list-group-item d-flex justify-content-between align-items-center',
      children: [this.todoContent, this.todoControl]
    });

    this.onDelete = null;
    this.onDone = null;
    this.isDone = false;
    this.addListeners();
  }

  addListeners() {
    this.deleteButton.addEventListener('click', this.handleDelete.bind(this));
    this.doneButton.addEventListener('click', this.handleDone.bind(this));
  }

  handleDelete() {
    if (this.onDelete) {
      this.onDelete(this.elem);
    } else {
      console.log('onDelete is not defined');
    }
    
  }

  handleDone() {
    this.todoContent.classList.toggle('todo-done');
    this.todoContent.classList.toggle('text-muted');
    
    if (this.isDone) {
      this.isDone = false;
      this.doneButton.innerHTML = 'Done';
    } else {
      this.isDone = true;
      this.doneButton.innerHTML = 'Cancel';
    }

    if (this.onDone) {
      this.onDone();
    }
  }
}


class TodoList {
  constructor(htmlElementId) {
    this.elem = document.getElementById(htmlElementId);
    this.children = [];

    this.onEmpty = null;
  }

  addTodo(text, date) {
    const todoItem = new TodoItem(text, date);
    todoItem.onDelete = this.deleteTodo.bind(this);

    todoItem.elem.key = Date.now();
    todoItem.elem.todoText = text;
    todoItem.elem.todoDate = date;

    this.children.push(todoItem.elem);
    
    this.update();
  }

  deleteTodo(elem) {
    this.children = this.children.filter((item) => {
      return item.key !== elem.key;
    });

    elem.remove();

    if (this.children.length == 0) {
      this.onEmpty();
    }
  }

  update() {
    this.children.forEach((el) => {
      this.elem.appendChild(el);
    });
  }

  showAllTodos() {
    const todoElements = this.elem.children;
    for (var i = 0; i < todoElements.length; i++) {
      const li = todoElements[i];
      li.classList.remove('d-none');
      li.classList.add('d-flex');
    }
  }

  showByDate(searchDate) {
    const todoElements = this.elem.children;
    for (var i = 0; i < todoElements.length; i++) {
      const li = todoElements[i];

      const todoDate = li.todoDate.getTime();
      const selectedDate = searchDate.getTime();

      if (todoDate !== selectedDate) {
        li.classList.remove('d-flex');
        li.classList.add('d-none');
      } else {
        li.classList.remove('d-none');
        li.classList.add('d-flex');
      }
    }

  }

  showMatched(searchText) {
    const todoElements = this.elem.children;

    for (var i = 0; i < todoElements.length; i++) {
      const li = todoElements[i];
      const todoText = li.todoText.toLowerCase();

      if (todoText.indexOf(searchText) === -1) {
        li.classList.remove('d-flex');
        li.classList.add('d-none');
      } else {
        li.classList.remove('d-none');
        li.classList.add('d-flex');
      }
    }
  }

  sortByText(direction) {
    const todoList = [];
    for (let i = 0; i < this.elem.children.length; i++) {
      todoList.push(this.elem.children[i]);
    }

    todoList.sort((a, b) => {
      const compare = direction ? a.todoText > b.todoText : a.todoText < b.todoText;

      if (compare) {
        return 1;
      } else {
        return -1;
      }
    });

    todoList.forEach((el)=> {
      this.elem.appendChild(el);
    });
  }

  sortByDate(direction) {
    const todoList = [];
    for (let i = 0; i < this.elem.children.length; i++) {
      todoList.push(this.elem.children[i]);
    }

    todoList.sort((a, b) => {
      const date1 = a.todoDate.getTime();
      const date2 = b.todoDate.getTime();

      if (direction) {
        return date1 - date2;
      } else {
        return date2 - date1;
      }

    });

    todoList.forEach((el)=> {
      this.elem.appendChild(el);
    });
  }

}


class SearchForm {
  constructor(config) {
    this.config = config;
    this.textInput = document.getElementById(this.config.searchTextId); 
    this.dateInput = document.getElementById(this.config.searchDateId);

    this.onTextChange = null;
    this.onDateChange = null;
    this.onDateClear = null;

    this.addListeners();
  }

  addListeners() {
    this.textInput.addEventListener('keyup', this.handleTextChange.bind(this));
    this.dateInput.addEventListener('change', this.handleDateChange.bind(this));
  }

  getText() {
    return this.textInput.value;
  }

  getDate() {
    return this.dateInput.valueAsDate;
  }

  handleTextChange(e) {
    if (this.onTextChange) {
      this.onTextChange(this.textInput.value);
    }
  }

  handleDateChange(e) {
    if (this.onDateChange) {
      if (this.dateInput.valueAsDate) {
        this.onDateChange(this.dateInput.valueAsDate);
      } else {
        this.onDateClear();
      }
    }
  }
}


class SortButton {
  constructor(htmlElementId) {
    this.elem = document.getElementById(htmlElementId);
    this.onClick = null;
    this.isDir = true;

    this.elem.addEventListener('click', () => {
      this.onClick(this.isDir);
    });
  }

  addDropElement() {
    if (!this.isDir) {
      this.elem.classList.remove('btn-dropup');
      this.elem.classList.add('btn-dropdown');
    } else {
      this.elem.classList.remove('btn-dropdown');
      this.elem.classList.add('btn-dropup');
    }
  }

  removeDropElement() {
    this.elem.classList.remove('btn-dropdown');
    this.elem.classList.remove('btn-dropup');
    this.isDir = true;
  }

  toggleDirection() {
    this.isDir = !this.isDir;
    this.addDropElement();
  }

  hide() {
    this.elem.classList.add('d-none');
    this.removeDropElement();
  }

  show() {
    this.elem.classList.remove('d-none');
  }
}


class Button {
  constructor(htmlElementId) {
    this.elem = document.getElementById(htmlElementId);
    this.onClick = null;
    this.elem.addEventListener('click', () => {
      this.onClick(this.isDir);
    });
  }

  hide() {
    this.elem.classList.add('d-none');
  }

  show() {
    this.elem.classList.remove('d-none');
  }
}


const sortTextBtn = new SortButton('sortByTextBtn');
const sortDatetBtn = new SortButton('sortByDateBtn');
const unsortedBtn = new Button('unsortedBtn');

const todoForm = new TodoForm({
  formId: 'addTodoForm',
  textInputId: 'todoText',
  dateInputId: 'todoDate'
});

const todoList = new TodoList('todoList');

todoList.onEmpty = () => {
  sortTextBtn.hide();
  sortDatetBtn.hide();
  unsortedBtn.hide();
};

todoForm.onAddTodo = (text, date) => {
  todoList.addTodo(text, date);
  sortTextBtn.show();
  sortDatetBtn.show();
  unsortedBtn.show();
};

sortTextBtn.onClick = (isDir) => {
  todoList.sortByText(isDir);
  sortTextBtn.toggleDirection();
  sortDatetBtn.removeDropElement();
};

sortDatetBtn.onClick = (isDir) => {
  todoList.sortByDate(isDir);
  sortDatetBtn.toggleDirection();
  sortTextBtn.removeDropElement();
};

unsortedBtn.onClick = () => {
  todoList.update();
  sortDatetBtn.removeDropElement();
  sortTextBtn.removeDropElement();
};

const searchForm = new SearchForm({
  searchTextId: 'searchText',
  searchDateId: 'searchDate'
});

searchForm.onTextChange = (searchText) => {
  todoList.showMatched(searchText);
};

searchForm.onDateChange = (searchDate) => {
  todoList.showByDate(searchDate);
};

searchForm.onDateClear = () => {
  todoList.showAllTodos();
};


