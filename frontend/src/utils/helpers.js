/**
 * Generates a clean URL slug from a text string.
 * @param {string} text 
 * @returns {string}
 */
export function generateSlug(text) {
  if (!text) return '';
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-');
}

/**
 * Summarizes long texts to a specific character limit, appending an ellipsis.
 * @param {string} text 
 * @param {number} limit 
 * @returns {string}
 */
export function truncateText(text, limit = 100) {
  if (!text) return '';
  if (text.length <= limit) return text;
  return text.slice(0, limit).trim() + '...';
}

/**
 * Normalizes year strings into readable display format.
 * @param {string} yearStr 
 * @returns {string}
 */
export function formatYearDisplay(yearStr) {
  if (!yearStr) return 'N/A';
  if (yearStr.match(/^\d{4}$/)) {
    return `Année ${yearStr}`;
  }
  return yearStr;
}
