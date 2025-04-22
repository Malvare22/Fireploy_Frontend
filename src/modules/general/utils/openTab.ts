/**
 * Opens the given URL in a new browser tab.
 * The new tab is opened with 'noopener' and 'noreferrer' for security reasons.
 *
 * @function
 * @param {string} url - The URL to open in a new tab.
 */
export function openInNewTab(url: string) {
  window.open(url, '_blank', 'noopener,noreferrer');
}
