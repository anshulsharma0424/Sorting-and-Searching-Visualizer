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

// DOM Elements
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

// Global Variables
let array = [];
let isSorted = false; // Tracks whether the current array is sorted

// Constants for speed mapping
const MIN_DELAY = 10;
const MAX_DELAY = 500;

// --- Functions to enable/disable Binary Search button ---
function disableBinarySearch() {
  binarySearchBtn.disabled = true;
  binarySearchBtn.style.opacity = "0.5";
  binarySearchBtn.style.cursor = "not-allowed";
}

function enableBinarySearch() {
  binarySearchBtn.disabled = false;
  binarySearchBtn.style.opacity = "1";
  binarySearchBtn.style.cursor = "pointer";
}

// Initially, disable binary search (unsorted array)
disableBinarySearch();

// --- Generate Array ---
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
  // Always enable Linear Search; Binary Search stays disabled until sorted
  linearSearchBtn.disabled = false;
  disableBinarySearch();
}

generateArrayBtn.addEventListener("click", generateArray);
arraySizeSlider.addEventListener("input", generateArray);

// --- Sorting Explanation Panel ---
toggleExplanationBtn.addEventListener("click", () => {
  explanationPanel.style.display = "block";
  const algorithm = algorithmSelect.value;
  explanationContent.innerHTML = getExplanation(algorithm);
});
closeExplanationBtn.addEventListener("click", () => {
  explanationPanel.style.display = "none";
});

// --- Search Explanation Panel ---
toggleSearchExplanationBtn.addEventListener("click", () => {
  searchExplanationPanel.style.display = "block";
  searchExplanationContent.innerHTML = getSearchExplanation();
});
closeSearchExplanationBtn.addEventListener("click", () => {
  searchExplanationPanel.style.display = "none";
});

// --- Animate Completion ---
// After sorting, run an animation, then revert bars back to original blue after 2 seconds.
function animateCompletion(bars) {
  for (const bar of bars) {
    bar.classList.add("sorted-animation");
  }
  setTimeout(() => {
    for (const bar of bars) {
      bar.classList.remove("sorted-animation");
    }
    // Wait 2 more seconds before reverting the bar color to original blue
    setTimeout(() => {
      for (const bar of bars) {
        bar.style.backgroundColor = "#3498db";
      }
    }, 2000);
  }, 1000);
}

// --- Main Sorting Control with Real-Time Timer ---
startSortBtn.addEventListener("click", async () => {
  // Disable controls during sorting
  generateArrayBtn.disabled = true;
  startSortBtn.disabled = true;
  arraySizeSlider.disabled = true;
  speedSlider.disabled = true;
  algorithmSelect.disabled = true;
  toggleExplanationBtn.disabled = true;
  // Disable search buttons during sorting
  linearSearchBtn.disabled = true;
  binarySearchBtn.disabled = true;
  toggleSearchExplanationBtn.disabled = true;
  
  // Reset timer and start real-time timer update
  timerDisplay.innerText = "Time: 0 ms";
  const startTime = performance.now();
  const timerInterval = setInterval(() => {
    const elapsedTime = Math.round(performance.now() - startTime);
    timerDisplay.innerText = `Time: ${elapsedTime} ms`;
  }, 16);
  
  // Inverse mapping: higher slider value → lower delay (faster sort)
  const sliderVal = parseInt(speedSlider.value);
  const delay = MAX_DELAY + MIN_DELAY - sliderVal;
  
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
  enableBinarySearch();
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

// Linear Search (always available)
linearSearchBtn.addEventListener("click", async () => {
  // Validate that search field is not empty
  if (searchValueInput.value.trim() === "") {
    alert("Search field cannot be empty. Please enter a number.");
    return;
  }
  const target = Number(searchValueInput.value);
  if (isNaN(target)) {
    alert("Please enter a valid number to search.");
    return;
  }
  const sliderVal = parseInt(speedSlider.value);
  const delay = MAX_DELAY + MIN_DELAY - sliderVal;
  await linearSearch(array, document.getElementsByClassName("bar"), target, delay);
});

// Binary Search (available only if array is sorted)
binarySearchBtn.addEventListener("click", async () => {
  if (!isSorted) {
    alert("Binary Search is available only after sorting!");
    return;
  }
  // Validate that search field is not empty
  if (searchValueInput.value.trim() === "") {
    alert("Search field cannot be empty. Please enter a number.");
    return;
  }
  const target = Number(searchValueInput.value);
  if (isNaN(target)) {
    alert("Please enter a valid number to search.");
    return;
  }
  const sliderVal = parseInt(speedSlider.value);
  const delay = MAX_DELAY + MIN_DELAY - sliderVal;
  await binarySearch(array, document.getElementsByClassName("bar"), target, delay);
});

// --- Generate Initial Array on Page Load ---
window.addEventListener("load", generateArray);
