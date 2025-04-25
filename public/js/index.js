// Fetch tasks from API endpoint when page loads
document.addEventListener("DOMContentLoaded", () => {
  fetchTasks();
  fetchCall();
});

// Function to fetch Business Call from API
const fetchCall = async () => {
  try {
    const response = await fetch("/api/call");
    if (!response.ok) {
      throw new Error("Failed to fetch call");
    }

    const call = await response.json();

    // Display Call in the container
    const callContainer = document.getElementById("call-container");

    if (Object.keys(call).length === 0) {
      callContainer.innerHTML = `<p class="text-center text-red-500">No call available.</p>`;
    } else {
      let html = `
<div class="p-2 bg-[#cca281]/5 my-1 rounded-sm">Name: ${call.name}</div>
<div class="p-2 bg-[#cca281]/5 my-1 rounded-sm">Company: ${call.company}</div>
<div class="p-2 bg-[#cca281]/5 my-1 rounded-sm">Phone: ${call.phone}</div>
<div class="p-2 bg-[#cca281]/5 my-1 rounded-sm">Day & Time: ${call.datetime}</div>
`;
      callContainer.innerHTML = html;
    }
  } catch (err) {
    console.error("Error fetching call:", err);
    document.getElementById("call-container").innerHTML =
      `<p class="text-center text-red-500">Failed to load call: ${err.message}</p>`;
  }
};

// Function to fetch tasks from API
const fetchTasks = async () => {
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
<li class="p-2 mb-2 bg-[#cca281]/10 hover:bg-[#cca281]/20 rounded-sm">
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
};
