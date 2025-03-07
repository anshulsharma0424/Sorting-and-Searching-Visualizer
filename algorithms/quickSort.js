// algorithms/quickSort.js
export async function quickSort(array, bars, delay) {
    function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
  
    async function partition(arr, low, high) {
      let pivot = arr[high];
      // Highlight pivot
      bars[high].style.backgroundColor = "purple";
      let i = low - 1;
      for (let j = low; j < high; j++) {
        bars[j].style.backgroundColor = "red";
        await sleep(delay);
        if (arr[j] < pivot) {
          i++;
          let temp = arr[i];
          arr[i] = arr[j];
          arr[j] = temp;
          bars[i].style.height = `${arr[i]}px`;
          bars[i].firstElementChild.innerText = arr[i];
          bars[j].style.height = `${arr[j]}px`;
          bars[j].firstElementChild.innerText = arr[j];
          bars[i].style.backgroundColor = "orange";
          bars[j].style.backgroundColor = "orange";
          await sleep(delay);
        }
        bars[j].style.backgroundColor = "#3498db";
      }
      // Swap pivot into correct position
      let temp = arr[i + 1];
      arr[i + 1] = arr[high];
      arr[high] = temp;
      bars[i + 1].style.height = `${arr[i + 1]}px`;
      bars[i + 1].firstElementChild.innerText = arr[i + 1];
      bars[high].style.height = `${arr[high]}px`;
      bars[high].firstElementChild.innerText = arr[high];
      await sleep(delay);
      bars[high].style.backgroundColor = "#3498db";
      bars[i + 1].style.backgroundColor = "green";
      return i + 1;
    }
  
    async function quickSortRecursive(arr, low, high) {
      if (low < high) {
        let pi = await partition(arr, low, high);
        await quickSortRecursive(arr, low, pi - 1);
        await quickSortRecursive(arr, pi + 1, high);
      }
    }
  
    await quickSortRecursive(array, 0, array.length - 1);
    // Mark all as sorted
    for (let i = 0; i < array.length; i++) {
      bars[i].style.backgroundColor = "green";
    }
  }
  