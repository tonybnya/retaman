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
      tasksContainer.innerHTML = `<p class="text-center text-red-500">No tasks available.</p>`;
    } else {
      let html = `<form method="post" action="/api/tasks/delete">`;
      html += `<ul class="pb-4">`;
      tasks.forEach((task) => {
        html += `
<li class="p-2 mb-2 bg-[#cca281]/10 hover:bg-[#cca281]/20 rounded-md">
  <label>
    <input type="checkbox" name="tasks" class="del" value="${task}" /> <span>${task}</span>
  </label>
</li>
`;
      });
      html += "</ul>";
      html += `
        <button
          type="submit"
          class="text-white bg-red-500/50 hover:bg-red-500/30 hover:scale-105 cursor-pointer focus:outline-none font-medium rounded-lg px-5 py-2 text-center"
        >
          Remove
        </button>
`;
      html += "</form>";
      tasksContainer.innerHTML = html;
    }
  } catch (error) {
    console.error("Error fetching tasks:", error);
    document.getElementById("tasks-container").innerHTML =
      `<p class="error text-center text-red-500">Failed to load tasks: ${error.message}</p>`;
  }
}
