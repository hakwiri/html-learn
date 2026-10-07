const leaderboard = [
  { name: "SAM_THE_DEV", progress: 95 },
  { name: "Akwirih K.", progress: 80 },
  { name: "CODE_CHRIS", progress: 72 },
  { name: "LISA.CODES", progress: 65 },
  { name: "DEV_JASON", progress: 58 }
];

const leaderList = document.getElementById("leaderList");
leaderboard.forEach(user => {
  const li = document.createElement("li");
  li.textContent = `${user.name} — ${user.progress}%`;
  leaderList.appendChild(li);
});

// Example dynamic progress update
document.getElementById("plannerBtn").addEventListener("click", () => {
  alert("Planner view coming soon!");
});

// Progress values
let progress = {
  html: 72,
  css: 45,
  js: 30
};

// Update progress bars dynamically
function updateProgress(skill, value) {
  progress[skill] = value;
  document.getElementById(`${skill}Progress`).textContent = `${value}%`;

  // Animate bar fill
  const card = document.querySelector(`.${skill}`);
  card.style.background = `linear-gradient(to top, #0078d7 ${value}%, #1e1e1e ${value}%)`;

  // Unlock badges
  checkBadges(skill, value);
}

// Badge unlock logic
function checkBadges(skill, value) {
  if (skill === "html" && value >= 100) {
    alert("🎉 You unlocked the HTML Hero badge!");
  }
  if (skill === "css" && value >= 100) {
    alert("🎉 You unlocked the CSS Stylist badge!");
  }
  if (skill === "js" && value >= 100) {
    alert("🎉 You unlocked the JavaScript Ninja badge!");
  }
  if (progress.html >= 100 && progress.css >= 100 && progress.js >= 100) {
    alert("🏆 Full‑Stack Champion unlocked!");
  }
}

// Example: simulate progress increase
document.getElementById("projectsBtn").addEventListener("click", () => {
  updateProgress("css", progress.css + 10); // adds 10% to CSS
});

// Track streak in localStorage
function updateStreak() {
  const today = new Date().toDateString();
  const lastLogin = localStorage.getItem("lastLogin");
  let streak = parseInt(localStorage.getItem("streak")) || 0;

  if (lastLogin !== today) {
    // If last login was yesterday, continue streak
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    if (lastLogin === yesterday.toDateString()) {
      streak++;
    } else {
      // Reset streak if missed a day
      streak = 1;
    }

    localStorage.setItem("streak", streak);
    localStorage.setItem("lastLogin", today);
  }

  document.getElementById("streak").textContent =
    `${streak}-Day Coding Streak 🔥 Keep it up!`;
}

// Run streak update on login
document.addEventListener("DOMContentLoaded", updateStreak);

document.getElementById("plannerBtn").addEventListener("click", () => {
  // Redirect to your planner page
  window.location.href = "planner.html"; 
});

// Load tasks and sync with dashboard
document.querySelectorAll(".task").forEach(task => {
  task.addEventListener("change", () => {
    const skill = task.dataset.skill;
    const value = parseInt(task.value);

    // Save progress in localStorage
    let current = parseInt(localStorage.getItem(skill)) || 0;
    if (task.checked) {
      current += value;
    } else {
      current -= value;
    }
    localStorage.setItem(skill, current);

    // Update dashboard instantly
    alert(`${skill.toUpperCase()} progress updated to ${current}%`);
  });
});

