// explanations.js
export function getExplanation(algorithm) {
    const explanations = {
      bubble: `<h2>Bubble Sort</h2>
        <p>Bubble sort repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order.</p>
        <p><strong>Time Complexity:</strong> O(n²)</p>
        <p><strong>Space Complexity:</strong> O(1)</p>`,
      selection: `<h2>Selection Sort</h2>
        <p>Selection sort finds the minimum element from the unsorted part and puts it at the beginning.</p>
        <p><strong>Time Complexity:</strong> O(n²)</p>
        <p><strong>Space Complexity:</strong> O(1)</p>`,
      insertion: `<h2>Insertion Sort</h2>
        <p>Insertion sort builds a sorted array one element at a time by inserting elements in their correct position.</p>
        <p><strong>Time Complexity:</strong> O(n²) average, O(n) best-case</p>
        <p><strong>Space Complexity:</strong> O(1)</p>`,
      merge: `<h2>Merge Sort</h2>
        <p>Merge sort divides the array into halves, sorts them recursively, and then merges the sorted halves.</p>
        <p><strong>Time Complexity:</strong> O(n log n)</p>
        <p><strong>Space Complexity:</strong> O(n)</p>`,
      quick: `<h2>Quick Sort</h2>
        <p>Quick sort selects a pivot and partitions the array so that elements less than the pivot come before it and greater come after, then sorts the partitions recursively.</p>
        <p><strong>Time Complexity:</strong> O(n log n) average, O(n²) worst-case</p>
        <p><strong>Space Complexity:</strong> O(log n) average</p>`,
      heap: `<h2>Heap Sort</h2>
        <p>Heap sort converts the array into a heap structure, then repeatedly extracts the maximum element and rebuilds the heap.</p>
        <p><strong>Time Complexity:</strong> O(n log n)</p>
        <p><strong>Space Complexity:</strong> O(1)</p>`
    };
    return explanations[algorithm] || `<p>No explanation available.</p>`;
  }
  