// algorithms/bubbleSort.js
export async function bubbleSort(array, bars, delay) {
    function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
    let n = array.length;
    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        // Highlight the bars being compared
        bars[j].style.backgroundColor = "red";
        bars[j + 1].style.backgroundColor = "red";
        await sleep(delay);
        
        if (array[j] > array[j + 1]) {
          // Swap in the array
          let temp = array[j];
          array[j] = array[j + 1];
          array[j + 1] = temp;
          // Update the bar heights and numbers
          bars[j].style.height = `${array[j]}px`;
          bars[j].firstElementChild.innerText = array[j];
          bars[j + 1].style.height = `${array[j + 1]}px`;
          bars[j + 1].firstElementChild.innerText = array[j + 1];
          // Indicate swap with color
          bars[j].style.backgroundColor = "orange";
          bars[j + 1].style.backgroundColor = "orange";
          await sleep(delay);
        }
        // Reset color after comparison
        bars[j].style.backgroundColor = "#3498db";
        bars[j + 1].style.backgroundColor = "#3498db";
      }
      // Mark the sorted bar
      bars[n - i - 1].style.backgroundColor = "green";
    }
    bars[0].style.backgroundColor = "green";
  }
  