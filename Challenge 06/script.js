// Initialize Lucide icons
lucide.createIcons();

// Get elements
const copyButton = document.getElementById("copyButton");
const copyInput = document.getElementById("copyInput");
const clipboardIcon = document.getElementById("clipboardIcon");
const checkIcon = document.getElementById("checkIcon");
const tooltipText = document.getElementById("tooltipText");
const pasteArea = document.getElementById("pasteArea");

// Create and add clear button
const clearButton = document.createElement("button");
clearButton.textContent = "Clear";
clearButton.className =
  "mt-2 px-4 py-2 bg-red-200 hover:bg-red-300 rounded-md transition-colors text-sm";
pasteArea.parentElement.appendChild(clearButton);

let timeoutId;

// Function to auto-resize textarea
const autoResize = (element) => {
  element.style.height = "auto";
  element.style.height = element.scrollHeight + "px";
};

// Add auto-resize to textarea
pasteArea.addEventListener("input", () => autoResize(pasteArea));

// Copy button click handler
copyButton.addEventListener("click", async () => {
  try {
    // Copy text to clipboard
    await navigator.clipboard.writeText(copyInput.value);

    // Update UI to show copied state
    clipboardIcon.classList.add("hidden");
    checkIcon.classList.remove("hidden");
    tooltipText.textContent = "Copied!";

    // Clear the input
    copyInput.value = "";

    // Clear any existing timeout
    if (timeoutId) clearTimeout(timeoutId);

    // Reset after 3 seconds
    timeoutId = setTimeout(() => {
      clipboardIcon.classList.remove("hidden");
      checkIcon.classList.add("hidden");
      tooltipText.textContent = "Copy";
    }, 3000);
  } catch (err) {
    console.error("Failed to copy text:", err);
  }
});

// Clear button click handler
clearButton.addEventListener("click", () => {
  pasteArea.value = "";
  autoResize(pasteArea); // Reset height when clearing
});

// Initialize textarea height
autoResize(pasteArea);
