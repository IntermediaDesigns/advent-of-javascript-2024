// Initialize variables for resize handling
let isResizingHorizontal = false;
let isResizingVertical = false;
let startY = 0;
let startX = 0;
let startHeight = 0;
let startWidth = 0;

// Get DOM elements
const topPanel = document.getElementById("top-panel");
const bottomLeftPanel = document.getElementById("bottom-left-panel");
const horizontalHandle = document.getElementById("horizontal-handle");
const verticalHandle = document.getElementById("vertical-handle");

// Horizontal resize handling
horizontalHandle.addEventListener("mousedown", (e) => {
  isResizingHorizontal = true;
  startY = e.clientY;
  startHeight = topPanel.offsetHeight;
  document.body.classList.add("no-select");
});

// Vertical resize handling
verticalHandle.addEventListener("mousedown", (e) => {
  isResizingVertical = true;
  startX = e.clientX;
  startWidth = bottomLeftPanel.offsetWidth;
  document.body.classList.add("no-select");
});

// Mouse move handler
document.addEventListener("mousemove", (e) => {
  if (isResizingHorizontal) {
    const deltaY = e.clientY - startY;
    const newHeight = Math.max(
      50,
      Math.min(startHeight + deltaY, window.innerHeight - 100)
    );
    topPanel.style.height = newHeight + "px";
  }

  if (isResizingVertical) {
    const deltaX = e.clientX - startX;
    const newWidth = Math.max(
      100,
      Math.min(startWidth + deltaX, window.innerWidth - 100)
    );
    bottomLeftPanel.style.width = newWidth + "px";
  }
});

// Mouse up handler
document.addEventListener("mouseup", () => {
  isResizingHorizontal = false;
  isResizingVertical = false;
  document.body.classList.remove("no-select");
});
