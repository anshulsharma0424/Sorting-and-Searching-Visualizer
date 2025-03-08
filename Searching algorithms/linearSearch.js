// A small helper to pause for a given time
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  /**
   * Animate a linear search on the given array.
   * @param {number[]} array - The data array
   * @param {HTMLCollection} bars - The bar elements
   * @param {number} target - The search value
   * @param {number} delay - Time in ms to wait between highlights
   * @returns {Promise<number>} - The index of the found element or -1 if not found
   */
  export async function linearSearchAnimated(array, bars, target, delay) {
    for (let i = 0; i < array.length; i++) {
      // Highlight current bar in red
      bars[i].style.backgroundColor = "#e64833";
      await sleep(delay);
  
      // Check if we found the target
      if (array[i] === target) {
        bars[i].style.backgroundColor = "#89f336"; // Found
        return i;
      } else {
        // Revert color if not found
        bars[i].style.backgroundColor = "#4f7c82";
      }
    }
    return -1;
  }
  