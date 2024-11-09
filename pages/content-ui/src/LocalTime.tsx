import { addUser, findUserByName } from '@extension/shared';

import { useEffect, useRef, useState } from 'react';
import { CONTACT_INFO_TAB, NAME_FROM_CONTACT_INFO, PHONE_FROM_CONTACT_INFO, prepareNewUser, USER_NAME } from './utils';
import Time from './Time';

import type { User } from '@extension/storage/lib/types';

export default function LocalTime() {
  const [userData, setUserData] = useState<User | null>(null);
  const contInfoPhoneRef = useRef<string | null>(null);

  useEffect(() => {
    async function init() {
      const currentUserName = document.querySelector(USER_NAME)?.textContent;
      if (currentUserName) {
        const user = await findUserByName(currentUserName);

        setUserData(user);
      }
    }

    init();
  }, []);

  useEffect(() => {
    const contactInfoObserver = new MutationObserver(() => {
      const contactInfoElm = document.querySelector(CONTACT_INFO_TAB);

      if (contactInfoElm && !contInfoPhoneRef.current) {
        const phoneFromContactInfo = document.querySelector(PHONE_FROM_CONTACT_INFO)?.textContent ?? null;
        contInfoPhoneRef.current = phoneFromContactInfo;

        if (phoneFromContactInfo) {
          setUserData(currentUserData => {
            if (!currentUserData) {
              const name = document.querySelector(NAME_FROM_CONTACT_INFO)?.textContent ?? '';
              const newUser = prepareNewUser({
                name,
                phone: phoneFromContactInfo,
              });
              addUser(newUser);
              return newUser;
            }
            return currentUserData;
          });
        }
      }
    });

    if (!userData) {
      contactInfoObserver.observe(document.body, {
        subtree: true,
        childList: true,
      });
    }

    return () => {
      contactInfoObserver.disconnect();
    };
  }, [userData]);

  console.log(userData, '<<<');

  return (
    <div>
      {/* {userData && <span className="text-white ml-2 text-xs">{getUserTime(userData)}</span>} */}
      {userData && <Time user={userData} />}
      {/* {userData && <span className="text-pink-400">{userData.phone}</span>} */}
      {!userData && <span className="ml-2 text-xs">(Click here to fetch local time)</span>}{' '}
    </div>
  );
}
