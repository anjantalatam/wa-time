import fs from 'node:fs';
const packageJson = JSON.parse(fs.readFileSync('../package.json', 'utf8'));

/**
 * After changing, please reload the extension at `chrome://extensions`
 * @type {chrome.runtime.ManifestV3}
 */
const manifest = {
  manifest_version: 3,
  default_locale: 'en',
  /**
   * if you want to support multiple languages, you can use the following reference
   * https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Internationalization
   */
  name: packageJson.name,
  version: packageJson.version,
  description: packageJson.description,
  // host_permissions: ['<all_urls>'],
  permissions: ['storage', 'scripting'],
  options_page: 'options/index.html',
  action: {
    // default_popup: 'popup/index.html',
    default_icon: 'icon-34.png',
  },
  chrome_url_overrides: {
    // newtab: 'new-tab/index.html',
  },
  icons: {
    128: 'icon-128.png',
  },
  content_scripts: [
    {
      matches: ['https://web.whatsapp.com/*'],
      js: ['content/index.iife.js'],
    },
    {
      matches: ['https://web.whatsapp.com/*'],
      js: ['content-ui/index.iife.js'],
    },
    {
      matches: ['https://web.whatsapp.com/*'],
      css: ['content.css'], // public folder
    },
  ],
  devtools_page: 'devtools/index.html',
  web_accessible_resources: [
    {
      resources: ['*.js', '*.css', '*.svg', 'icon-128.png', 'icon-34.png'],
      matches: ['*://*/*'],
    },
  ],
};

export default manifest;
