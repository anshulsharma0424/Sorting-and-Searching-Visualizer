// explanations/searchingAlgorithmsExplanations.js
export function getSearchingExplanation() {
    return `
      <section>
        <h4><u>Linear Search</u></h4>
        <p><strong>Description:</strong> Checks each element one by one until the target is found or the array ends.</p>
        <ul>
          <li><strong>Time Complexity:</strong> O(n)</li>
          <li><strong>Space Complexity:</strong> O(1)</li>
        </ul>
      </section>
      <br>
      <section>
        <h4><u>Binary Search</u></h4>
        <p><strong>Description:</strong> Efficiently finds the target in a sorted array by repeatedly dividing the search interval in half.</p>
        <ul>
          <li><strong>Time Complexity:</strong> O(log n)</li>
          <li><strong>Space Complexity:</strong> O(1)</li>
        </ul>
      </section>
    `;
  }
  