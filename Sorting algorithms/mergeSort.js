// Sorting algorithms/mergeSort.js
export async function mergeSort(array, bars, delay) {
  function sleep(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }
  async function merge(arr, l, m, r) {
    let n1 = m - l + 1, n2 = r - m;
    let left = [], right = [];
    for (let i = 0; i < n1; i++) {
      left.push(arr[l+i]);
      bars[l+i].style.backgroundColor = "#e64833";
    }
    for (let j = 0; j < n2; j++) {
      right.push(arr[m+1+j]);
      bars[m+1+j].style.backgroundColor = "#e64833";
    }
    await sleep(delay);
    let i = 0, j = 0, k = l;
    while (i < n1 && j < n2) {
      if (left[i] <= right[j]) {
        arr[k] = left[i];
        bars[k].style.height = `${left[i]}px`;
        bars[k].firstElementChild.innerText = left[i];
        i++;
      } else {
        arr[k] = right[j];
        bars[k].style.height = `${right[j]}px`;
        bars[k].firstElementChild.innerText = right[j];
        j++;
      }
      bars[k].style.backgroundColor = "orange";
      await sleep(delay);
      bars[k].style.backgroundColor = "#3498db";
      k++;
    }
    while (i < n1) {
      arr[k] = left[i];
      bars[k].style.height = `${left[i]}px`;
      bars[k].firstElementChild.innerText = left[i];
      bars[k].style.backgroundColor = "orange";
      await sleep(delay);
      bars[k].style.backgroundColor = "#3498db";
      i++; k++;
    }
    while (j < n2) {
      arr[k] = right[j];
      bars[k].style.height = `${right[j]}px`;
      bars[k].firstElementChild.innerText = right[j];
      bars[k].style.backgroundColor = "orange";
      await sleep(delay);
      bars[k].style.backgroundColor = "#3498db";
      j++; k++;
    }
  }
  
  async function mergeSortRecursive(arr, l, r) {
    if (l >= r) return;
    let m = l + Math.floor((r - l) / 2);
    await mergeSortRecursive(arr, l, m);
    await mergeSortRecursive(arr, m+1, r);
    await merge(arr, l, m, r);
  }
  
  await mergeSortRecursive(array, 0, array.length - 1);
  for (let i = 0; i < array.length; i++) {
    bars[i].style.backgroundColor = "#89f336";
  }
}
