// ==========================================
// 1. NAVIGATION & HAMBURGER MENU (SPA Logic)
// ==========================================

function toggleMenu() {
  const navLinks = document.getElementById("navLinks");
  navLinks.classList.toggle("active");
}

function navigate(pageId, clickedLink) {
  // 1. Swap the visible page
  const pages = document.querySelectorAll(".page");
  pages.forEach((page) => page.classList.remove("active"));
  document.getElementById(pageId).classList.add("active");

  // 2. Update active state in navigation links
  if (clickedLink) {
    const links = document.querySelectorAll(".nav-links a");
    links.forEach((link) => link.classList.remove("active"));
    clickedLink.classList.add("active");
  }

  // 3. Auto-close mobile menu
  const navLinks = document.getElementById("navLinks");
  if (navLinks.classList.contains("active")) {
    navLinks.classList.remove("active");
  }

  window.scrollTo({ top: 0, behavior: "smooth" });
}

// ==========================================
// 2. ACADEMIC PLANNER (Arrays, Functions, DOM)
// ==========================================

let tasks = [];

function addTask() {
  const taskInput = document.getElementById("taskInput");
  const text = taskInput.value.trim();

  if (text !== "") {
    const newTask = {
      id: Date.now(),
      text: text,
      completed: false,
    };

    tasks.push(newTask);
    taskInput.value = "";
    renderTasks();
  }
}

function toggleTask(id) {
  tasks = tasks.map((task) =>
    task.id === id ? { ...task, completed: !task.completed } : task,
  );
  renderTasks();
}

function deleteTask(id) {
  tasks = tasks.filter((task) => task.id !== id);
  renderTasks();
}

function renderTasks() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  tasks.forEach((task) => {
    const li = document.createElement("li");
    li.className = `task-item ${task.completed ? "completed" : ""}`;

    const span = document.createElement("span");
    span.textContent = task.text;

    const actionsDiv = document.createElement("div");
    actionsDiv.className = "task-actions";

    const completeBtn = document.createElement("button");
    completeBtn.innerHTML =
      '<span class="material-symbols-outlined" style="font-size: 18px;">check</span>';
    completeBtn.className = "btn-complete";
    completeBtn.onclick = () => toggleTask(task.id);

    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML =
      '<span class="material-symbols-outlined" style="font-size: 18px;">close</span>';
    deleteBtn.className = "btn-delete";
    deleteBtn.onclick = () => deleteTask(task.id);

    actionsDiv.appendChild(completeBtn);
    actionsDiv.appendChild(deleteBtn);
    li.appendChild(span);
    li.appendChild(actionsDiv);

    taskList.appendChild(li);
  });
}

// ==========================================
// 3. CONTACT FORM VALIDATION (Event Handling)
// ==========================================

document
  .getElementById("contactForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const message = document.getElementById("message").value.trim();

    const phoneError = document.getElementById("phoneError");
    const formStatus = document.getElementById("formStatus");

    phoneError.textContent = "";
    formStatus.textContent = "";

    if (!name || !email || !phone || !message) {
      formStatus.textContent = "> Error: All fields are required.";
      formStatus.style.color = "#ff6b6b";
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      formStatus.textContent = "> Error: Please enter a valid email address.";
      formStatus.style.color = "#ff6b6b";
      return;
    }

    const phoneRegex = /^\d+$/;
    if (!phoneRegex.test(phone)) {
      phoneError.textContent = "> Phone number must contain only digits.";
      return;
    }

    formStatus.textContent = "> Success: Message payload delivered.";
    formStatus.style.color = "var(--accent)";

    document.getElementById("contactForm").reset();
  });
// --- INTERACTIVE GRID TRACKING ---
document.addEventListener("mousemove", (e) => {
  const interactiveGrid = document.querySelector(".interactive-grid");
  if (interactiveGrid) {
    // Grab the mouse's X and Y coordinates on the screen
    const x = e.clientX;
    const y = e.clientY;

    // Feed the coordinates to our CSS variables
    interactiveGrid.style.setProperty("--mouse-x", `${x}px`);
    interactiveGrid.style.setProperty("--mouse-y", `${y}px`);
  }
});
