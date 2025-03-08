// Sorting algorithms/quickSort.js
export async function quickSort(array, bars, delay) {
  function sleep(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }
  async function partition(arr, low, high) {
    let pivot = arr[high];
    bars[high].style.backgroundColor = "purple";
    let i = low - 1;
    for (let j = low; j < high; j++) {
      bars[j].style.backgroundColor = "#e64833";
      await sleep(delay);
      if (arr[j] < pivot) {
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];
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
    [arr[i+1], arr[high]] = [arr[high], arr[i+1]];
    bars[i+1].style.height = `${arr[i+1]}px`;
    bars[i+1].firstElementChild.innerText = arr[i+1];
    bars[high].style.height = `${arr[high]}px`;
    bars[high].firstElementChild.innerText = arr[high];
    await sleep(delay);
    bars[high].style.backgroundColor = "#3498db";
    bars[i+1].style.backgroundColor = "#89f336";
    return i+1;
  }
  
  async function quickSortRecursive(arr, low, high) {
    if (low < high) {
      let pi = await partition(arr, low, high);
      await quickSortRecursive(arr, low, pi-1);
      await quickSortRecursive(arr, pi+1, high);
    }
  }
  
  await quickSortRecursive(array, 0, array.length-1);
  for (let i = 0; i < array.length; i++) {
    bars[i].style.backgroundColor = "#89f336";
  }
}
