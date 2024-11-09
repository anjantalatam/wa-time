import { createRoot } from 'react-dom/client';
import { HEADER_NAME_CONTAINER } from './utils';
import LocalTime from './LocalTime';
import tailwindcssOutput from '../dist/tailwind-output.css?inline';

export function injectTime() {
  const timeElement = document.createElement('div');
  timeElement.id = 'watime-time-element';

  const shadowRoot = timeElement.attachShadow({ mode: 'open' });

  const headerNameContainerElm = document.querySelector(HEADER_NAME_CONTAINER);

  headerNameContainerElm?.append(timeElement);

  const rootIntoShadow = document.createElement('div');
  rootIntoShadow.id = 'watime-time-element-shadow-root';

  if (navigator.userAgent.includes('Firefox')) {
    /**
     * In the firefox environment, adoptedStyleSheets cannot be used due to the bug
     * @url https://bugzilla.mozilla.org/show_bug.cgi?id=1770592
     *
     * Injecting styles into the document, this may cause style conflicts with the host page
     */
    const styleElement = document.createElement('style');
    styleElement.innerHTML = tailwindcssOutput;
    shadowRoot.appendChild(styleElement);
  } else {
    /** Inject styles into shadow dom */
    const globalStyleSheet = new CSSStyleSheet();
    globalStyleSheet.replaceSync(tailwindcssOutput);
    shadowRoot.adoptedStyleSheets = [globalStyleSheet];
  }

  shadowRoot.appendChild(rootIntoShadow);
  createRoot(rootIntoShadow).render(<LocalTime />);
}
