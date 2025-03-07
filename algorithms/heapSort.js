// algorithms/heapSort.js
export async function heapSort(array, bars, delay) {
    function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
  
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
        // Highlight before swap
        bars[i].style.backgroundColor = "red";
        bars[largest].style.backgroundColor = "red";
        await sleep(delay);
        
        let temp = arr[i];
        arr[i] = arr[largest];
        arr[largest] = temp;
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
  
    // Build max heap
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      await heapify(array, n, i);
    }
    
    // Extract elements one by one
    for (let i = n - 1; i > 0; i--) {
      bars[0].style.backgroundColor = "red";
      bars[i].style.backgroundColor = "red";
      await sleep(delay);
      
      let temp = array[0];
      array[0] = array[i];
      array[i] = temp;
      
      bars[0].style.height = `${array[0]}px`;
      bars[0].firstElementChild.innerText = array[0];
      bars[i].style.height = `${array[i]}px`;
      bars[i].firstElementChild.innerText = array[i];
      
      bars[0].style.backgroundColor = "orange";
      bars[i].style.backgroundColor = "orange";
      await sleep(delay);
      
      bars[i].style.backgroundColor = "green"; // element is in its final place
      await heapify(array, i, 0);
    }
    bars[0].style.backgroundColor = "green";
  }
  