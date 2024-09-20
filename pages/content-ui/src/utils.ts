import { createContext, Dispatch, SetStateAction } from 'react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
// @ts-ignore
import { getLocalInfo } from 'phone-number-to-timezone';
import { User } from '@extension/storage/lib/types';

dayjs.extend(utc);
dayjs.extend(timezone);

export const CHAT_HEADER = '#main > header';
export const HEADER_NAME_CONTAINER = '#main > header > div._amie > div._amif > div._amig > div';
export const USER_NAME = `${HEADER_NAME_CONTAINER} > span`;

export const HEADER_SUBTEXT = '#main > header > div._amie > div:nth-of-type(2) > span';

export const PHONE_FROM_CONTACT_INFO =
  '#app > div > div.three._aigs > div._aigv._aig-._aohg > span > div > span > div > div > section > div > div> div > span > span';

export const NAME_FROM_CONTACT_INFO =
  '#app > div > div.three._aigs > div._aigv._aig-._aohg > span > div > span > div > div > section > div> div > h2 > div > span';

export const CONTACT_INFO_TAB = 'div[title="Contact info"]';

export const TXT_BUSINESS_ACCOUNT = 'Business Account';

export const UserContext = createContext<{
  currentUser: string | null;
  setCurrentUser: Dispatch<SetStateAction<string | null>> | null;
}>({ currentUser: null, setCurrentUser: null });

export const getUserTime = (user: User) => {
  const utcTime = dayjs().utc();
  const gmtOffset = user.offset * 60;
  const localTime = utcTime.utcOffset(gmtOffset);
  return localTime.format('hh:mm A');
};

export const prepareNewUser = (partialUser: Pick<User, 'name' | 'phone'>): User => {
  const details = getLocalInfo(partialUser.phone);
  const offset = details?.country_info?.offset;

  return {
    id: crypto.randomUUID(),
    name: partialUser.name,
    phone: partialUser.phone,
    offset,
  };
};
