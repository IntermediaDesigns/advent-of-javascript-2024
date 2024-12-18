const textInput = document.getElementById("textInput");
const charCount = document.getElementById("charCount");
const clearBtn = document.getElementById("clearBtn");

function updateCharCount() {
  const count = textInput.value.length;
  charCount.textContent = count;

  if (count >= 200) {
    charCount.classList.remove("text-gray-600");
    charCount.classList.add("text-red-600");
  } else {
    charCount.classList.remove("text-red-600");
    charCount.classList.add("text-gray-600");
  }
}

textInput.addEventListener("input", updateCharCount);

clearBtn.addEventListener("click", function () {
  textInput.value = "";
  updateCharCount();
  textInput.focus();
});
