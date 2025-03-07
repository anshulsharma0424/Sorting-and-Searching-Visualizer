// searching/binarySearch.js
export async function binarySearch(array, bars, target, delay) {
    function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
    let left = 0;
    let right = array.length - 1;
    let found = false;
    while (left <= right) {
      let mid = Math.floor((left + right) / 2);
      // Highlight the middle element being checked
      bars[mid].style.backgroundColor = "purple";
      await sleep(delay);
      if (array[mid] === target) {
        bars[mid].style.backgroundColor = "green";
        // Add animation class for visual feedback
        bars[mid].classList.add("search-result");
        // After 3 seconds, revert to original blue
        setTimeout(() => {
          bars[mid].style.backgroundColor = "#3498db";
          bars[mid].classList.remove("search-result");
        }, 3000);
        found = true;
        break;
      } else if (array[mid] < target) {
        bars[mid].style.backgroundColor = "#3498db";
        left = mid + 1;
      } else {
        bars[mid].style.backgroundColor = "#3498db";
        right = mid - 1;
      }
      await sleep(delay);
    }
    if (!found) {
      alert("Value not found using Binary Search!");
    }
  }
  