function saveToLocalStorage(projects) {
    localStorage.setItem('projects', JSON.stringify(projects));
  }
  
  function loadFromLocalStorage() {
    const projects = localStorage.getItem('projects');
    return projects ? JSON.parse(projects) : null;
  }
  
  export { saveToLocalStorage, loadFromLocalStorage };
  