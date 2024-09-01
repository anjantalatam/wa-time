import { useEffect } from 'react';
import { CHAT_HEADER, USER_NAME } from './utils';
import { injectTime } from './injectTime';

let currentUser: string | null = null;

export default function App() {
  useEffect(() => {
    console.log('content ui loaded');
    const bodyObserver = new MutationObserver(() => {
      const chatHeaderElement = document.querySelector(CHAT_HEADER);
      const currentUserElm = document.querySelector(USER_NAME);

      if (chatHeaderElement && currentUserElm) {
        if (currentUserElm?.textContent !== currentUser) {
          currentUser = currentUserElm?.textContent ?? null;
          injectTime();
        }
      }
    });

    bodyObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      bodyObserver.disconnect();
    };
  }, []);

  return <div></div>;
}
