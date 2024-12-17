import { movies } from "./movies.js";

const input = document.getElementById("movieSearch");
const dropdown = document.getElementById("movieDropdown");
const selectedMovieElement = document.getElementById("selectedMovie");
const clearButton = document.getElementById("clearSearch");
let selectedIndex = -1;

// Function to sort movies by title
function sortMovies(moviesToSort) {
  return [...moviesToSort].sort((a, b) => {
    const titleA = a.Title.replace(/^\d+\.\s/, "").toLowerCase();
    const titleB = b.Title.replace(/^\d+\.\s/, "").toLowerCase();
    return titleA.localeCompare(titleB);
  });
}

// Show dropdown when clicking in input
input.addEventListener("click", () => {
  if (!dropdown.children.length) {
    showDropdown(sortMovies(movies));
  }
  dropdown.classList.remove("hidden");
  input.setAttribute("aria-expanded", "true");
});

// Handle input changes
input.addEventListener("input", (e) => {
  const value = e.target.value.toLowerCase();
  const filteredMovies = movies.filter(
    (movie) =>
      movie.Title.toLowerCase().includes(value) || movie.Year.includes(value)
  );
  showDropdown(sortMovies(filteredMovies));
  selectedIndex = -1;
  toggleClearButton();
});

// Handle keyboard navigation
input.addEventListener("keydown", (e) => {
  const items = dropdown.querySelectorAll(".dropdown-item");

  switch (e.key) {
    case "ArrowDown":
      e.preventDefault();
      selectedIndex = Math.min(selectedIndex + 1, items.length - 1);
      updateSelection(items);
      break;
    case "ArrowUp":
      e.preventDefault();
      selectedIndex = Math.max(selectedIndex - 1, -1);
      updateSelection(items);
      break;
    case "Enter":
      if (selectedIndex >= 0) {
        items[selectedIndex].click();
      }
      break;
    case "Escape":
      hideDropdown();
      break;
  }
});

// Clear button functionality
clearButton.addEventListener("click", (e) => {
  e.stopPropagation(); // Prevent the click from triggering the input's click event
  clearSearch();
});

// Close dropdown when clicking outside
document.addEventListener("click", (e) => {
  if (
    !input.contains(e.target) &&
    !dropdown.contains(e.target) &&
    !clearButton.contains(e.target)
  ) {
    hideDropdown();
  }
});

function showDropdown(moviesToShow) {
  dropdown.innerHTML = moviesToShow
    .map(
      (movie, index) => `
        <div
            class="dropdown-item p-3 flex items-center gap-4 cursor-pointer border-b-2 border-gray-200"
            role="option"
            aria-selected="false"
            data-index="${index}"
        >
            <div class="w-[60px] h-[100px] bg-gray-200 rounded flex items-center justify-center flex-shrink-0">
                <img
                    src="${movie.Image}"
                    alt="${movie["Image Alt"]}"
                    class="w-full h-full object-cover rounded"
                >
            </div>
            <div>
                <div class="text-xl font-bold">${movie.Title.replace(
                  /^\d+\.\s/,
                  ""
                )}</div>
                <div class="text-gray-500 text-lg">${movie.Year}</div>
            </div>
        </div>
    `
    )
    .join("");

  // Add click handlers to dropdown items
  dropdown.querySelectorAll(".dropdown-item").forEach((item) => {
    item.addEventListener("click", () => {
      const movie = moviesToShow[item.dataset.index];
      input.value = movie.Title.replace(/^\d+\.\s/, "");
      displaySelectedMovie(movie);
      hideDropdown();
      toggleClearButton();
    });
  });
}

function hideDropdown() {
  dropdown.classList.add("hidden");
  input.setAttribute("aria-expanded", "false");
  selectedIndex = -1;
}

function updateSelection(items) {
  items.forEach((item, index) => {
    item.classList.toggle("selected", index === selectedIndex);
    item.setAttribute("aria-selected", index === selectedIndex);
    if (index === selectedIndex) {
      item.scrollIntoView({ block: "nearest" });
    }
  });
}

function displaySelectedMovie(movie) {
  // Update all the movie details
  document.getElementById("movieTitle").textContent = movie.Title.replace(
    /^\d+\.\s/,
    ""
  );
  document.getElementById("movieYear").textContent = movie.Year;
  document.getElementById("movieDuration").textContent = movie.Duration;
  document.getElementById("movieRating").textContent = `★ ${movie.Rating}/10`;
  document.getElementById("movieDirector").textContent = movie.Director;
  document.getElementById("movieStars").textContent = movie.Stars;
  document.getElementById("movieDescription").textContent = movie.Description;

  // Update the image
  const movieImage = document.getElementById("movieImage");
  movieImage.src = movie.Image;
  movieImage.alt = movie["Image Alt"];

  // Show the movie details section
  selectedMovieElement.classList.remove("hidden");

  // Smooth scroll to the movie details
  selectedMovieElement.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

function toggleClearButton() {
  clearButton.classList.toggle("hidden", !input.value);
}

function clearSearch() {
  input.value = "";
  selectedMovieElement.classList.add("hidden");
  showDropdown(sortMovies(movies)); // Show all movies when clearing
  hideDropdown(); // Then hide the dropdown
  toggleClearButton();
  input.focus();
}
