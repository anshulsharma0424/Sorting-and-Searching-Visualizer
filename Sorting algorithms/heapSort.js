// Sorting algorithms/heapSort.js
export async function heapSort(array, bars, delay) {
  function sleep(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }
  let n = array.length;
  
  async function heapify(arr, n, i) {
    let largest = i;
    let left = 2 * i + 1;
    let right = 2 * i + 2;
    if (left < n && arr[left] > arr[largest]) {
      largest = left;
    }
    if (right < n && arr[right] > arr[largest]) {
      largest = right;
    }
    if (largest !== i) {
      bars[i].style.backgroundColor = "#e64833";
      bars[largest].style.backgroundColor = "#e64833";
      await sleep(delay);
      [arr[i], arr[largest]] = [arr[largest], arr[i]];
      bars[i].style.height = `${arr[i]}px`;
      bars[i].firstElementChild.innerText = arr[i];
      bars[largest].style.height = `${arr[largest]}px`;
      bars[largest].firstElementChild.innerText = arr[largest];
      bars[i].style.backgroundColor = "orange";
      bars[largest].style.backgroundColor = "orange";
      await sleep(delay);
      bars[i].style.backgroundColor = "#3498db";
      bars[largest].style.backgroundColor = "#3498db";
      await heapify(arr, n, largest);
    }
  }
  
  for (let i = Math.floor(n/2) - 1; i >= 0; i--) {
    await heapify(array, n, i);
  }
  
  for (let i = n-1; i > 0; i--) {
    bars[0].style.backgroundColor = "#e64833";
    bars[i].style.backgroundColor = "#e64833";
    await sleep(delay);
    [array[0], array[i]] = [array[i], array[0]];
    bars[0].style.height = `${array[0]}px`;
    bars[0].firstElementChild.innerText = array[0];
    bars[i].style.height = `${array[i]}px`;
    bars[i].firstElementChild.innerText = array[i];
    bars[0].style.backgroundColor = "orange";
    bars[i].style.backgroundColor = "orange";
    await sleep(delay);
    bars[i].style.backgroundColor = "#89f336";
    await heapify(array, i, 0);
  }
  bars[0].style.backgroundColor = "#89f336";
}
