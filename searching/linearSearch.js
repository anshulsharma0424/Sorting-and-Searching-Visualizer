// searching/linearSearch.js
export async function linearSearch(array, bars, target, delay) {
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  let found = false;
  for (let i = 0; i < array.length; i++) {
    // Highlight the current bar being checked
    bars[i].style.backgroundColor = "red";
    await sleep(delay);
    if (array[i] === target) {
      // Highlight found element with a distinct color
      bars[i].style.backgroundColor = "green";
      // Add an animation to draw attention to the result
      bars[i].classList.add("search-result");
      // After 3 seconds, revert to the original blue color
      setTimeout(() => {
        bars[i].style.backgroundColor = "#3498db";
        bars[i].classList.remove("search-result");
      }, 3000);
      found = true;
      break; // Stops at first occurrence; remove break to find all occurrences
    } else {
      bars[i].style.backgroundColor = "#3498db";
    }
  }
  if (!found) {
    alert("Value not found using Linear Search!");
  }
}
