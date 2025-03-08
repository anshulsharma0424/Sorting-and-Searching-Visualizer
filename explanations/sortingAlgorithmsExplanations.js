// explanations/sortingAlgorithmsExplanations.js
export function getSortingExplanation(algorithm) {
    const explanations = {
      bubble: `
        <section>

          <p>Bubble Sort works by repeatedly traversing the array and comparing adjacent pairs of elements. When two elements are out of order, they are swapped. With each full pass through the array, the largest unsorted element "bubbles up" to its correct position. This process continues until no more swaps are needed, meaning the array is completely sorted.</p>
          <br>
          
            <li><strong>Time Complexity:</strong> O(n²) worst/average, O(n) best</li>
            <li><strong>Space Complexity:</strong> O(1)</li>
          
        </section>
      `,
      selection: `
        <section>

          <p>Selection Sort divides the array into a sorted and an unsorted region. It repeatedly identifies the smallest element from the unsorted portion and swaps it with the first unsorted element. This step-by-step expansion of the sorted region continues until the entire array is sorted.</p>
          <br>
          
            <li><strong>Time Complexity:</strong> O(n²)</li>
            <li><strong>Space Complexity:</strong> O(1)</li>
          
        </section>
      `,
      insertion: `
        <section>

          <p>Insertion Sort builds the final sorted array incrementally. It starts by assuming the first element is sorted, then it takes the next element and inserts it into the correct position within the sorted section. This process is repeated for each element, making it particularly effective for small or nearly sorted arrays.</p>
          <br>
          
            <li><strong>Time Complexity:</strong> O(n²) worst, O(n) best</li>
            <li><strong>Space Complexity:</strong> O(1)</li>
          
        </section>
      `,
      merge: `
        <section>

          <p>Merge Sort is a divide and conquer algorithm. It divides the array into two halves, recursively sorts each half, and finally merges the two sorted halves back together. The merging process involves combining two sorted arrays into one sorted array by comparing the smallest elements of each.</p>
          <br>
          
            <li><strong>Time Complexity:</strong> O(n log n)</li>
            <li><strong>Space Complexity:</strong> O(n)</li>
          
        </section>
      `,
      quick: `
        <section>

          <p>Quick Sort selects a pivot element and partitions the remaining elements into two groups: those less than the pivot and those greater than the pivot. It then recursively sorts the partitions. Although it offers excellent average performance, its worst-case performance can occur when the pivot is poorly chosen.</p>
          <br>
          
            <li><strong>Time Complexity:</strong> O(n log n) average, O(n²) worst</li>
            <li><strong>Space Complexity:</strong> O(log n) average</li>
          
        </section>
      `,
      heap: `
        <section>

          <p>Heap Sort transforms the array into a max-heap, a complete binary tree where each parent node is greater than its children. It then repeatedly removes the largest element (the root) and re-establishes the heap property until the entire array is sorted. This method ensures a sorted array through systematic extraction and heap reconstruction.</p>
          <br>
          
            <li><strong>Time Complexity:</strong> O(n log n)</li>
            <li><strong>Space Complexity:</strong> O(1)</li>
          
        </section>
      `,
    };
    return explanations[algorithm] || `<p>No explanation available.</p>`;
  }
  