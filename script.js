// main.js

// Import sorting algorithms from "Sorting algorithms" folder
import { bubbleSort } from './Sorting algorithms/bubbleSort.js';
import { selectionSort } from './Sorting algorithms/selectionSort.js';
import { insertionSort } from './Sorting algorithms/insertionSort.js';
import { mergeSort } from './Sorting algorithms/mergeSort.js';
import { quickSort } from './Sorting algorithms/quickSort.js';
import { heapSort } from './Sorting algorithms/heapSort.js';

// Import animated searching algorithms from "Searching algorithms" folder
import { linearSearchAnimated } from './Searching algorithms/linearSearch.js';
import { binarySearchAnimated } from './Searching algorithms/binarySearch.js';

// Import explanations
import { getSortingExplanation } from './explanations/sortingAlgorithmsExplanations.js';
import { getSearchingExplanation } from './explanations/searchingAlgorithmsExplanations.js';

// Get references to DOM elements
const arrayContainer   = document.getElementById("arrayContainer");
const generateArrayBtn = document.getElementById("generateArray");
const startSortBtn     = document.getElementById("startSort");
const algorithmSelect  = document.getElementById("algorithm");
const speedSlider      = document.getElementById("speed");
const arraySizeSlider  = document.getElementById("arraySize");
const timerDisplay     = document.getElementById("timerDisplay");

const explanationContent = document.getElementById("explanationContent");

const searchValueInput   = document.getElementById("searchValue");
const linearSearchBtn    = document.getElementById("linearSearchBtn");
const binarySearchBtn    = document.getElementById("binarySearchBtn");
const searchInfoBtn      = document.getElementById("searchInfoBtn");
const searchResult       = document.getElementById("searchResult");

// Global state
let array    = [];
let isSorted = false; // true after a sort operation completes
const MIN_DELAY = 10;
const MAX_DELAY = 500;

/* Helper: Reset all bar colors to the default (#4f7c82) */
function resetBarColors() {
  const bars = document.getElementsByClassName("bar");
  for (const bar of bars) {
    bar.style.backgroundColor = "#4f7c82";
    bar.style.border = "";
  }
}

/* Generate a new random array and create bar elements */
function generateArray() {
  array = [];
  isSorted = false;
  binarySearchBtn.disabled = true; // Disable binary search until sorted
  searchResult.innerText = "";
  searchResult.classList.remove("visible");
  arrayContainer.innerHTML = "";
  
  const size = parseInt(arraySizeSlider.value);
  const barWidth = Math.floor(arrayContainer.clientWidth / size) - 2;
  
  for (let i = 0; i < size; i++) {
    const value = Math.floor(Math.random() * 300) + 20;
    array.push(value);
    
    const bar = document.createElement("div");
    bar.classList.add("bar");
    bar.style.height = `${value}px`;
    bar.style.width  = `${barWidth}px`;
    
    const numberElem = document.createElement("div");
    numberElem.classList.add("bar-number");
    numberElem.innerText = value;
    bar.appendChild(numberElem);
    
    arrayContainer.appendChild(bar);
  }
}

/* Sort the array with a real-time timer and animate the process */
async function startSorting() {
  // Disable controls during sorting
  generateArrayBtn.disabled = true;
  startSortBtn.disabled     = true;
  arraySizeSlider.disabled  = true;
  speedSlider.disabled      = true;
  algorithmSelect.disabled  = true;
  
  timerDisplay.innerText = "Time: 0 ms";
  const startTime = performance.now();
  const timerInterval = setInterval(() => {
    const elapsed = Math.round(performance.now() - startTime);
    timerDisplay.innerText = `Time: ${elapsed} ms`;
  }, 16);
  
  // Determine animation delay from the speed slider
  const sliderVal = parseInt(speedSlider.value);
  const delay = MAX_DELAY + MIN_DELAY - sliderVal;
  const bars = document.getElementsByClassName("bar");
  const algorithm = algorithmSelect.value;
  
  // Call the chosen sorting algorithm
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
  
  clearInterval(timerInterval);
  const finalTime = Math.round(performance.now() - startTime);
  timerDisplay.innerText = `Time: ${finalTime} ms`;
  
  isSorted = true;
  binarySearchBtn.disabled = false;
  
  // Animate completion: pulse then reset to default color
  animateCompletion(bars);
  // After 1 second, reset bars to default color
  setTimeout(resetBarColors, 1000);
  
  // Re-enable controls
  generateArrayBtn.disabled = false;
  startSortBtn.disabled     = false;
  arraySizeSlider.disabled  = false;
  speedSlider.disabled      = false;
  algorithmSelect.disabled  = false;
}

/* Animate bars with a pulse effect then reset to default color */
function animateCompletion(bars) {
  for (const bar of bars) {
    bar.classList.add("sorted-animation");
  }
  setTimeout(() => {
    for (const bar of bars) {
      bar.style.backgroundColor = "#4f7c82";
      bar.classList.remove("sorted-animation");
    }
  }, 1000);
}

/* Clear any highlights (used in searching) */
function clearSearchHighlights() {
  const bars = document.getElementsByClassName("bar");
  for (const bar of bars) {
    bar.style.backgroundColor = "#4f7c82";
    bar.style.border = "";
  }
}

/* Highlight a found bar */
function highlightBar(index) {
  const bars = document.getElementsByClassName("bar");
  if (bars[index]) {
    bars[index].style.border = "3px solid #007aff"; // Apple's blue accent
  }
}

/* Handle Linear Search Animation with real-time timer */
async function handleLinearSearch() {
  clearSearchHighlights();
  searchResult.classList.remove("visible");

  const target = parseInt(searchValueInput.value);
  if (isNaN(target)) {
    searchResult.innerText = "Please enter a valid number.";
    searchResult.classList.add("visible");
    return;
  }
  
  // Initialize timer display for search
  timerDisplay.innerText = "Time: 0 ms";
  const startTime = performance.now();
  const timerInterval = setInterval(() => {
    const elapsed = Math.round(performance.now() - startTime);
    timerDisplay.innerText = `Time: ${elapsed} ms`;
  }, 16);
  
  const sliderVal = parseInt(speedSlider.value);
  const delay = MAX_DELAY + MIN_DELAY - sliderVal;
  const bars = document.getElementsByClassName("bar");
  
  // Call the linear search animation function
  const index = await linearSearchAnimated(array, bars, target, delay);
  
  // Stop the timer and display final elapsed time
  clearInterval(timerInterval);
  const finalTime = Math.round(performance.now() - startTime);
  timerDisplay.innerText = `Time: ${finalTime} ms`;

  if (index !== -1) {
    searchResult.innerText = `Element ${target} found at index ${index}.`;
    highlightBar(index);
  } else {
    searchResult.innerText = `Element ${target} not found.`;
  }
  searchResult.classList.add("visible");
  
  // Reset bar colors after search animation (1s delay)
  setTimeout(resetBarColors, 1000);
}

/* Handle Binary Search Animation with real-time timer */
async function handleBinarySearch() {
  clearSearchHighlights();
  searchResult.classList.remove("visible");

  const target = parseInt(searchValueInput.value);
  if (isNaN(target)) {
    searchResult.innerText = "Please enter a valid number.";
    searchResult.classList.add("visible");
    return;
  }
  
  // Initialize timer display for search
  timerDisplay.innerText = "Time: 0 ms";
  const startTime = performance.now();
  const timerInterval = setInterval(() => {
    const elapsed = Math.round(performance.now() - startTime);
    timerDisplay.innerText = `Time: ${elapsed} ms`;
  }, 16);
  
  const sliderVal = parseInt(speedSlider.value);
  const delay = MAX_DELAY + MIN_DELAY - sliderVal;
  const bars = document.getElementsByClassName("bar");
  
  let index = -1;
  if (!isSorted) {
    searchResult.innerText = "Array is not sorted. Using linear search animation.";
    searchResult.classList.add("visible");
    index = await linearSearchAnimated(array, bars, target, delay);
  } else {
    index = await binarySearchAnimated(array, bars, target, delay);
  }
  
  // Stop the timer and display final elapsed time
  clearInterval(timerInterval);
  const finalTime = Math.round(performance.now() - startTime);
  timerDisplay.innerText = `Time: ${finalTime} ms`;
  
  if (index !== -1) {
    searchResult.innerText = `Element ${target} found at index ${index}.`;
    highlightBar(index);
  } else {
    searchResult.innerText = `Element ${target} not found.`;
  }
  searchResult.classList.add("visible");
  
  setTimeout(resetBarColors, 1000);
}

/* Handle Search Info: Display search explanation */
function handleSearchInfo() {
  const info = getSearchingExplanation();
  explanationContent.innerHTML = info;
}

/* Event Listeners */
generateArrayBtn.addEventListener("click", generateArray);
arraySizeSlider.addEventListener("input", generateArray);
startSortBtn.addEventListener("click", startSorting);
linearSearchBtn.addEventListener("click", handleLinearSearch);
binarySearchBtn.addEventListener("click", handleBinarySearch);
searchInfoBtn.addEventListener("click", handleSearchInfo);

algorithmSelect.addEventListener("change", () => {
  const algo = algorithmSelect.value;
  explanationContent.innerHTML = getSortingExplanation(algo);
});

window.addEventListener("load", () => {
  generateArray();
  explanationContent.innerHTML = getSortingExplanation(algorithmSelect.value);
});
