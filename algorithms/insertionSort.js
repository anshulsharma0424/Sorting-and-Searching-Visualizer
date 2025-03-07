// algorithms/insertionSort.js
export async function insertionSort(array, bars, delay) {
    function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
    let n = array.length;
    for (let i = 1; i < n; i++) {
      let key = array[i];
      let j = i - 1;
      // Highlight the key element
      bars[i].style.backgroundColor = "red";
      await sleep(delay);
      while (j >= 0 && array[j] > key) {
        bars[j].style.backgroundColor = "red";
        array[j + 1] = array[j];
        bars[j + 1].style.height = `${array[j + 1]}px`;
        bars[j + 1].firstElementChild.innerText = array[j + 1];
        await sleep(delay);
        bars[j].style.backgroundColor = "#3498db";
        j--;
      }
      array[j + 1] = key;
      bars[j + 1].style.height = `${key}px`;
      bars[j + 1].firstElementChild.innerText = key;
      bars[j + 1].style.backgroundColor = "green"; // mark the inserted element as sorted
      await sleep(delay);
    }
    // Mark all bars as sorted
    for (let i = 0; i < n; i++) {
      bars[i].style.backgroundColor = "green";
    }
  }
  