// script.js
import { bubbleSort } from './algorithms/bubbleSort.js';
import { selectionSort } from './algorithms/selectionSort.js';
import { insertionSort } from './algorithms/insertionSort.js';
import { mergeSort } from './algorithms/mergeSort.js';
import { quickSort } from './algorithms/quickSort.js';
import { heapSort } from './algorithms/heapSort.js';
import { getExplanation } from './explanations.js';
import { linearSearch } from './searching/linearSearch.js';
import { binarySearch } from './searching/binarySearch.js';
import { getSearchExplanation } from './searchExplanations.js';

const arrayContainer = document.getElementById("arrayContainer");
const generateArrayBtn = document.getElementById("generateArray");
const startSortBtn = document.getElementById("startSort");
const algorithmSelect = document.getElementById("algorithm");
const speedSlider = document.getElementById("speed");
const arraySizeSlider = document.getElementById("arraySize");
const timerDisplay = document.getElementById("timerDisplay");

const searchValueInput = document.getElementById("searchValue");
const linearSearchBtn = document.getElementById("linearSearchBtn");
const binarySearchBtn = document.getElementById("binarySearchBtn");
const toggleSearchExplanationBtn = document.getElementById("toggleSearchExplanation");

const explanationPanel = document.getElementById("explanationPanel");
const explanationContent = document.getElementById("explanationContent");
const toggleExplanationBtn = document.getElementById("toggleExplanation");
const closeExplanationBtn = document.getElementById("closeExplanation");

const searchExplanationPanel = document.getElementById("searchExplanationPanel");
const searchExplanationContent = document.getElementById("searchExplanationContent");
const closeSearchExplanationBtn = document.getElementById("closeSearchExplanation");

let array = [];
let isSorted = false; // Tracks if the current array is sorted

// Constants for speed mapping
const MIN_DELAY = 10;
const MAX_DELAY = 500;

// Generate array and display bars with numbers
function generateArray() {
  isSorted = false; // New array is unsorted
  array = [];
  arrayContainer.innerHTML = "";
  const size = parseInt(arraySizeSlider.value);
  const barWidth = Math.floor(arrayContainer.clientWidth / size) - 2;
  for (let i = 0; i < size; i++) {
    const value = Math.floor(Math.random() * 300) + 20;
    array.push(value);
    const bar = document.createElement("div");
    bar.classList.add("bar");
    bar.style.height = `${value}px`;
    bar.style.width = `${barWidth}px`;
    
    // Create and append number element
    const numberElem = document.createElement("div");
    numberElem.classList.add("bar-number");
    numberElem.innerText = value;
    bar.appendChild(numberElem);
    
    arrayContainer.appendChild(bar);
  }
  // When a new unsorted array is generated, disable binary search.
  binarySearchBtn.disabled = true;
  // Linear search is always enabled.
  linearSearchBtn.disabled = false;
}

generateArrayBtn.addEventListener("click", generateArray);
arraySizeSlider.addEventListener("input", generateArray);

// Toggle sorting explanation panel
toggleExplanationBtn.addEventListener("click", () => {
  explanationPanel.style.display = "block";
  const algorithm = algorithmSelect.value;
  explanationContent.innerHTML = getExplanation(algorithm);
});
closeExplanationBtn.addEventListener("click", () => {
  explanationPanel.style.display = "none";
});

// Toggle search explanation panel
toggleSearchExplanationBtn.addEventListener("click", () => {
  searchExplanationPanel.style.display = "block";
  searchExplanationContent.innerHTML = getSearchExplanation();
});
closeSearchExplanationBtn.addEventListener("click", () => {
  searchExplanationPanel.style.display = "none";
});

// Function to animate all bars on completion
function animateCompletion(bars) {
  // Add the completion animation class to each bar
  for (const bar of bars) {
    bar.classList.add("sorted-animation");
  }
  // Remove the animation class after 1 second (animation duration)
  setTimeout(() => {
    for (const bar of bars) {
      bar.classList.remove("sorted-animation");
    }
    // Wait 2 more seconds before reverting the bar color to blue
    setTimeout(() => {
      for (const bar of bars) {
        bar.style.backgroundColor = "#3498db"; // original blue color
      }
    }, 2000);
  }, 1000);
}


// Main sorting control with real-time timer
startSortBtn.addEventListener("click", async () => {
  // Disable controls during the sort
  generateArrayBtn.disabled = true;
  startSortBtn.disabled = true;
  arraySizeSlider.disabled = true;
  speedSlider.disabled = true;
  algorithmSelect.disabled = true;
  toggleExplanationBtn.disabled = true;
  // Disable both search buttons during sorting
  linearSearchBtn.disabled = true;
  binarySearchBtn.disabled = true;
  toggleSearchExplanationBtn.disabled = true;
  
  // Reset and start timer
  timerDisplay.innerText = "Time: 0 ms";
  const startTime = performance.now();
  const timerInterval = setInterval(() => {
    const currentTime = performance.now();
    const elapsedTime = Math.round(currentTime - startTime);
    timerDisplay.innerText = `Time: ${elapsedTime} ms`;
  }, 16);
  
  // Inverse mapping: higher slider value → lower delay (faster sort)
  const sliderVal = parseInt(speedSlider.value);
  const delay = MAX_DELAY + MIN_DELAY - sliderVal; // e.g., slider=10 → delay=500; slider=500 → delay=10
  
  const bars = document.getElementsByClassName("bar");
  const algorithm = algorithmSelect.value;
  
  switch (algorithm) {
    case "bubble":
      await bubbleSort(array, bars, delay);
      break;
    case "selection":
      await selectionSort(array, bars, delay);
      break;
    case "insertion":
      await insertionSort(array, bars, delay);
      break;
    case "merge":
      await mergeSort(array, bars, delay);
      break;
    case "quick":
      await quickSort(array, bars, delay);
      break;
    case "heap":
      await heapSort(array, bars, delay);
      break;
    default:
      break;
  }
  
  // Stop the timer and update display with final time
  clearInterval(timerInterval);
  const finalElapsed = Math.round(performance.now() - startTime);
  timerDisplay.innerText = `Time: ${finalElapsed} ms`;
  
  // Run final animation on completion
  animateCompletion(bars);
  
  // Mark the array as sorted so that both search options are now available
  isSorted = true;
  linearSearchBtn.disabled = false;
  binarySearchBtn.disabled = false;
  toggleSearchExplanationBtn.disabled = false;
  
  // Re-enable other controls after sorting is complete
  generateArrayBtn.disabled = false;
  startSortBtn.disabled = false;
  arraySizeSlider.disabled = false;
  speedSlider.disabled = false;
  algorithmSelect.disabled = false;
  toggleExplanationBtn.disabled = false;
});




// --- Search Event Listeners ---

// Linear Search button (always available when not sorting)
linearSearchBtn.addEventListener("click", async () => {
  const input = searchValueInput.value.trim();
  if (!input) {
    alert("Please enter a valid number to search.");
    return;
  }
  const target = Number(input);
  if (isNaN(target)) {
    alert("Please enter a valid number to search.");
    return;
  }
  // Inverse mapping: use same delay mapping as sorting (optional)
  const sliderVal = parseInt(speedSlider.value);
  const delay = MAX_DELAY + MIN_DELAY - sliderVal;
  await linearSearch(array, document.getElementsByClassName("bar"), target, delay);
});

// Binary Search button (available only if array is sorted)
binarySearchBtn.addEventListener("click", async () => {
  if (!isSorted) {
    alert("Binary Search is available only after sorting!");
    return;
  }
  const input = searchValueInput.value.trim();
  if (!input) {
    alert("Please enter a valid number to search.");
    return;
  }
  const target = Number(input);
  if (isNaN(target)) {
    alert("Please enter a valid number to search.");
    return;
  }
  const sliderVal = parseInt(speedSlider.value);
  const delay = MAX_DELAY + MIN_DELAY - sliderVal;
  await binarySearch(array, document.getElementsByClassName("bar"), target, delay);
});

// Generate an initial array on page load
window.addEventListener("load", generateArray);
