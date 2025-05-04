const taskInput = document.getElementById('task-input');
const dueDate = document.getElementById('due-date');
const priority = document.getElementById('priority');
const notesInput = document.getElementById('notes');
const taskList = document.getElementById('task-list');
const filterStatus = document.getElementById('filter-status');
const filterPriority = document.getElementById('filter-priority');
const streakCount = document.getElementById('streak-count');
const taskCompleted = document.getElementById('task-completed');
const motivationalMessage = document.getElementById('motivational-message');
const clearTasksButton = document.getElementById('clear-tasks');
let completedTasks = 0;
let streak = 0;

document.getElementById('add-task').addEventListener('click', addTask);
clearTasksButton.addEventListener('click', clearTasks);
filterStatus.addEventListener('change', applyFilters);
filterPriority.addEventListener('change', applyFilters);

function addTask() {
  const text = taskInput.value.trim();
  if (!text) return;

  const task = document.createElement('li');
  task.className = 'task';
  task.dataset.priority = priority.value;
  task.dataset.status = 'incomplete';

  const timestamp = new Date().toLocaleString();
  const taskHtml = `
    <div class="details">
      <span>${text}</span>
      <div>
        <button class="complete"><i class="fas fa-check-circle"></i> Complete</button>
        <button class="delete"><i class="fas fa-trash"></i> Delete</button>
      </div>
    </div>
    <div class="meta">📅 Due: ${dueDate.value || 'N/A'} | 🔥 Priority: ${priority.value} | 🕒 Created: ${timestamp}</div>
    <div class="notes">${notesInput.value || ''}</div>
  `;
  task.innerHTML = taskHtml;
  taskList.appendChild(task);

  taskInput.value = '';
  dueDate.value = '';
  notesInput.value = '';

  task.querySelector('.complete').addEventListener('click', () => toggleComplete(task));
  task.querySelector('.delete').addEventListener('click', () => removeTask(task));
}

function toggleComplete(task) {
  task.classList.toggle('completed');
  task.dataset.status = task.classList.contains('completed') ? 'completed' : 'incomplete';

  if (task.classList.contains('completed')) {
    completedTasks++;
    taskCompleted.textContent = completedTasks;
    streak++;
    streakCount.textContent = streak;
    updateMotivationalMessage();
  } else {
    completedTasks--;
    taskCompleted.textContent = completedTasks;
  }
}

function removeTask(task) {
  task.remove();
  if (task.classList.contains('completed')) {
    completedTasks--;
    taskCompleted.textContent = completedTasks;
  }
}

function clearTasks() {
  taskList.innerHTML = '';
  completedTasks = 0;
  taskCompleted.textContent = completedTasks;
  streak = 0;
  streakCount.textContent = streak;
  updateMotivationalMessage();
}

function applyFilters() {
  const status = filterStatus.value;
  const pri = filterPriority.value;

  document.querySelectorAll('.task').forEach(task => {
    const matchStatus = status === 'all' || task.dataset.status === status;
    const matchPriority = pri === 'All' || task.dataset.priority === pri;
    task.style.display = matchStatus && matchPriority ? 'block' : 'none';
  });
}

function updateMotivationalMessage() {
  if (streak >= 7) {
    motivationalMessage.textContent = "🔥 You're on fire! Keep up the amazing streak!";
  } else if (streak >= 3) {
    motivationalMessage.textContent = "💪 Great job! Keep going to hit your next milestone!";
  } else {
    motivationalMessage.textContent = "Keep going! You're doing great!";
  }
}
