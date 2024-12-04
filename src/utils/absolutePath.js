import path from 'path';

/**
 * Get absolute path from a relative path.
 * @param {string} relativePath - The relative path.
 * @returns {string} - The absolute path.
 */
function getAbsolutePath(relativePath) {
  return path.resolve(new URL(import.meta.url).pathname, relativePath);
}

export { getAbsolutePath };
