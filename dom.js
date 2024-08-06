import Project from './project';
import Todo from './todo';
import { saveToLocalStorage, loadFromLocalStorage } from './storage';

const projectList = [];
let currentProject = new Project('Default');

function initializeApp() {
  loadProjects();
  renderProjects();
  document.getElementById('add-project-btn').addEventListener('click', addProject);
  document.getElementById('add-todo-btn').addEventListener('click', addTodo);
}

function loadProjects() {
  const storedProjects = loadFromLocalStorage();
  if (storedProjects) {
    storedProjects.forEach(project => {
      const newProject = new Project(project.name);
      project.todos.forEach(todo => {
        newProject.addTodo(new Todo(
          todo.title,
          todo.description,
          todo.dueDate,
          todo.priority
        ));
      });
      projectList.push(newProject);
    });
    currentProject = projectList[0];
  } else {
    projectList.push(currentProject);
  }
}

function renderProjects() {
  const projectContainer = document.getElementById('project-list');
  projectContainer.innerHTML = '';
  projectList.forEach(project => {
    const projectElement = document.createElement('div');
    projectElement.textContent = project.name;
    projectElement.addEventListener('click', () => {
      currentProject = project;
      renderTodos();
    });
    projectContainer.appendChild(projectElement);
  });
}

function renderTodos() {
  const todoContainer = document.getElementById('todo-list');
  todoContainer.innerHTML = '';
  currentProject.todos.forEach(todo => {
    const todoElement = document.createElement('div');
    todoElement.textContent = `${todo.title} - ${todo.dueDate}`;
    todoElement.addEventListener('click', () => {
      // Expand todo details
    });
    todoContainer.appendChild(todoElement);
  });
}

function addProject() {
  const projectName = prompt('Enter project name:');
  if (projectName) {
    const newProject = new Project(projectName);
    projectList.push(newProject);
    saveToLocalStorage(projectList);
    renderProjects();
  }
}

function addTodo() {
  const title = prompt('Enter todo title:');
  const description = prompt('Enter todo description:');
  const dueDate = prompt('Enter due date:');
  const priority = prompt('Enter priority:');
  if (title && dueDate && priority) {
    const newTodo = new Todo(title, description, dueDate, priority);
    currentProject.addTodo(newTodo);
    saveToLocalStorage(projectList);
    renderTodos();
  }
}

export { initializeApp };
