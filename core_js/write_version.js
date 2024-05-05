/**
 * This file writes only the version into every page.
 * @return version
 */
const version = browser.runtime.getManifest().version;
document.getElementById('version').textContent = version;
