// Fetch tasks from API endpoint when page loads
document.addEventListener("DOMContentLoaded", () => {
  fetchTasks();
});

// Function to fetch tasks from API
async function fetchTasks() {
  try {
    const response = await fetch("/api/tasks");
    if (!response.ok) {
      throw new Error("Failed to fetch tasks");
    }

    const tasks = await response.json();

    // Display tasks in the container
    const tasksContainer = document.getElementById("tasks-container");

    if (tasks.length === 0) {
      tasksContainer.innerHTML = "<p>No tasks available.</p>";
    } else {
      let html = "<ul>";
      tasks.forEach((task) => {
        html += `<li>${task}</li>`;
      });
      html += "</ul>";
      tasksContainer.innerHTML = html;
    }
  } catch (error) {
    console.error("Error fetching tasks:", error);
    document.getElementById("tasks-container").innerHTML =
      `<p class="error">Failed to load tasks: ${error.message}</p>`;
  }
}
