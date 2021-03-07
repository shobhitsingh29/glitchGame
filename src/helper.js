// Helper file

/**
 * Generate dot value proportional to its size.
 *
 * @param {number} dotSize
 * @returns {number} dotValue
 */
function generateDotValue(dotSize) {
  return 11 - (dotSize * 0.1);
}

/**
 * Generate number to set starting position of dot on the screen
 *
 * @param {number} min
 * @param {number} max
 * @returns {number} dotPosition
 */
function generateDotPosition(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

/**
 * Generate number to set height and width of the dot. Typically will keep between 10 and 100.
 * 
 * @param {number} min 
 * @param {number} max
 * @returns {number} dotSize 
 */
function generateDotSize(min, max) {
  return Math.round((Math.random() * (max - min) + min) / 10) * 10;
}

/**
 * Delete dot element.
 *
 * @param {HTMLElement} element
 */
function removeElement(element) {
  element.parentNode.removeChild(element);
}
