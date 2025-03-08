// A small helper to pause for a given time
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  /**
   * Animate a binary search on the given sorted array.
   * @param {number[]} array - The sorted data array
   * @param {HTMLCollection} bars - The bar elements
   * @param {number} target - The search value
   * @param {number} delay - Time in ms to wait between highlights
   * @returns {Promise<number>} - The index of the found element or -1 if not found
   */
  export async function binarySearchAnimated(array, bars, target, delay) {
    let low = 0;
    let high = array.length - 1;
  
    while (low <= high) {
      const mid = Math.floor((low + high) / 2);
  
      // Highlight the mid bar
      bars[mid].style.backgroundColor = "#e64833";
      await sleep(delay);
  
      if (array[mid] === target) {
        // Found the target
        bars[mid].style.backgroundColor = "#89f336";
        return mid;
      } else {
        // Not the target => revert mid color
        bars[mid].style.backgroundColor = "#4f7c82";
  
        if (array[mid] < target) {
          low = mid + 1;
        } else {
          high = mid - 1;
        }
      }
    }
    return -1;
  }
  