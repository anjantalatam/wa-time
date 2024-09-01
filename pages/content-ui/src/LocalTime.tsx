import { useStorageSuspense } from '@extension/shared';

import { addUser, findUserByName } from './userActions';
import { useEffect, useRef, useState } from 'react';
import { CONTACT_INFO_TAB, NAME_FROM_CONTACT_INFO, PHONE_FROM_CONTACT_INFO, USER_NAME } from './utils';
import { User } from '@extension/storage/lib/types';

function getUserTime() {}

export default function LocalTime() {
  const [userData, setUserData] = useState<User | null>(null);
  const contInfoPhoneRef = useRef<string | null>(null);

  useEffect(() => {
    async function init() {
      const currentUserName = document.querySelector(USER_NAME)?.textContent;
      if (currentUserName) {
        const user = await findUserByName(currentUserName);

        setUserData(user);
        return user;
      }
      return null;
    }

    init();
  }, []);

  useEffect(() => {
    const contactInfoObserver = new MutationObserver(() => {
      const contactInfoElm = document.querySelector(CONTACT_INFO_TAB);

      console.log('>>>here');
      if (contactInfoElm && !contInfoPhoneRef.current) {
        const phoneFromContactInfo = document.querySelector(PHONE_FROM_CONTACT_INFO)?.textContent ?? null;
        contInfoPhoneRef.current = phoneFromContactInfo;

        if (phoneFromContactInfo) {
          setUserData(currentUserData => {
            if (!currentUserData) {
              const name = document.querySelector(NAME_FROM_CONTACT_INFO)?.textContent ?? '';
              const newUser = {
                name,
                phone: phoneFromContactInfo,
              };
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

  return (
    <div>
      {/* <span className="text-pink-400">{userData?.phone}</span> */}
      <span className="text-white ml-2 text-xs">(Click here to fetch local time)</span>
    </div>
  );
}
