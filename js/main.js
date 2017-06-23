import app from './app.js';
document.addEventListener('DOMContentLoaded', () => {
  const title = document.getElementById('app-name');
  title.innerText = app;
})
