// Sorting algorithms/selectionSort.js
export async function selectionSort(array, bars, delay) {
  function sleep(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }
  let n = array.length;
  for (let i = 0; i < n; i++) {
    let minIdx = i;
    bars[minIdx].style.backgroundColor = "yellow";
    for (let j = i+1; j < n; j++) {
      bars[j].style.backgroundColor = "#e64833";
      await sleep(delay);
      if (array[j] < array[minIdx]) {
        bars[minIdx].style.backgroundColor = "#3498db";
        minIdx = j;
        bars[minIdx].style.backgroundColor = "yellow";
      } else {
        bars[j].style.backgroundColor = "#3498db";
      }
    }
    if (minIdx !== i) {
      [array[i], array[minIdx]] = [array[minIdx], array[i]];
      bars[i].style.height = `${array[i]}px`;
      bars[i].firstElementChild.innerText = array[i];
      bars[minIdx].style.height = `${array[minIdx]}px`;
      bars[minIdx].firstElementChild.innerText = array[minIdx];
      bars[i].style.backgroundColor = "orange";
      bars[minIdx].style.backgroundColor = "orange";
      await sleep(delay);
    }
    bars[i].style.backgroundColor = "#89f336";
  }
}
