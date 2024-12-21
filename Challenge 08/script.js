const tagInput = document.getElementById("tagInput");
const tagList = document.getElementById("tagList");
let tags = [];

function createTag(text) {
  const tag = document.createElement("div");
  tag.className =
    "flex items-center gap-1 bg-slate-100 text-slate-800 px-3 py-1 rounded-full";

  const tagText = document.createElement("span");
  tagText.textContent = text;

  const removeButton = document.createElement("button");
  removeButton.innerHTML = "&times;";
  removeButton.className = "ml-1 text-red-600 hover:text-red-800 font-bold";
  removeButton.addEventListener("click", () => {
    tag.remove();
    tags = tags.filter((t) => t !== text);
  });

  tag.appendChild(tagText);
  tag.appendChild(removeButton);
  return tag;
}

function addTag(text) {
  const trimmedText = text.trim();
  if (trimmedText && !tags.includes(trimmedText)) {
    tags.push(trimmedText);
    tagList.appendChild(createTag(trimmedText));
  }
}

tagInput.addEventListener("keydown", (e) => {
  if (e.key === "Backspace" && !tagInput.value && tags.length > 0) {
    const lastTag = tags.pop();
    tagList.removeChild(tagList.lastChild);
  }
});

tagInput.addEventListener("keyup", (e) => {
  const text = tagInput.value;
  if (e.key === "," || e.key === "Enter") {
    const tagText = text.replace(",", "");
    addTag(tagText);
    tagInput.value = "";
  }
});

// Prevent form submission on Enter key
tagInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
  }
});
