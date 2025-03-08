// Sorting algorithms/bubbleSort.js
export async function bubbleSort(array, bars, delay) {
  function sleep(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }
  let n = array.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      bars[j].style.backgroundColor = "#e64833";
      bars[j+1].style.backgroundColor = "#e64833";
      await sleep(delay);
      if (array[j] > array[j+1]) {
        [array[j], array[j+1]] = [array[j+1], array[j]];
        bars[j].style.height = `${array[j]}px`;
        bars[j].firstElementChild.innerText = array[j];
        bars[j+1].style.height = `${array[j+1]}px`;
        bars[j+1].firstElementChild.innerText = array[j+1];
        bars[j].style.backgroundColor = "orange";
        bars[j+1].style.backgroundColor = "orange";
        await sleep(delay);
      }
      bars[j].style.backgroundColor = "#3498db";
      bars[j+1].style.backgroundColor = "#3498db";
    }
    bars[n-i-1].style.backgroundColor = "#89f336";
  }
  bars[0].style.backgroundColor = "#89f336";
}
