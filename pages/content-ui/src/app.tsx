import { useEffect } from 'react';
import { CHAT_HEADER, HEADER_SUBTEXT, TXT_BUSINESS_ACCOUNT, USER_NAME } from './utils';
import { injectTime } from './injectTime';
import { deleteActiveIntervals, windowWithTimers } from './store';

let currentUser: string | null = null;

export default function App() {
  useEffect(() => {
    console.log('content ui loaded');
    const bodyObserver = new MutationObserver(() => {
      const chatHeaderElement = document.querySelector(CHAT_HEADER);
      const chatHeaderSubtextElm = document.querySelector(HEADER_SUBTEXT);
      const currentUserElm = document.querySelector(USER_NAME);

      if (chatHeaderElement && currentUserElm) {
        console.log(windowWithTimers.getActiveIntervals(), 'intervals');

        if (currentUserElm?.textContent !== currentUser) {
          currentUser = currentUserElm?.textContent ?? null;

          let isBusiness = chatHeaderSubtextElm && chatHeaderSubtextElm?.textContent === TXT_BUSINESS_ACCOUNT;
          if (!isBusiness) {
            // do not TimeElement for business accounts
            injectTime();
          } else {
            deleteActiveIntervals();
          }
        }
      } else if (windowWithTimers.getActiveIntervals().length > 0) {
        // handles user switch from normal chat to group chat
        // clean up interval cretae in normal chat
        deleteActiveIntervals();
        currentUser = null;
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
