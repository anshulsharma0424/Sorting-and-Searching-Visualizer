// Sorting algorithms/insertionSort.js
export async function insertionSort(array, bars, delay) {
  function sleep(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }
  let n = array.length;
  for (let i = 1; i < n; i++) {
    let key = array[i];
    let j = i - 1;
    bars[i].style.backgroundColor = "#e64833";
    await sleep(delay);
    while (j >= 0 && array[j] > key) {
      array[j+1] = array[j];
      bars[j+1].style.height = `${array[j+1]}px`;
      bars[j+1].firstElementChild.innerText = array[j+1];
      await sleep(delay);
      j--;
    }
    array[j+1] = key;
    bars[j+1].style.height = `${key}px`;
    bars[j+1].firstElementChild.innerText = key;
    bars[j+1].style.backgroundColor = "#89f336";
    await sleep(delay);
  }
  for (let i = 0; i < n; i++) {
    bars[i].style.backgroundColor = "#89f336";
  }
}
