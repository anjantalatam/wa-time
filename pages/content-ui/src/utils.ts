import { createContext, Dispatch, SetStateAction } from 'react';

export const CHAT_HEADER = '#main > header';
export const HEADER_NAME_CONTAINER = '#main > header > div._amie > div > div > div';
export const USER_NAME = `${HEADER_NAME_CONTAINER} > span`;

export const PHONE_FROM_CONTACT_INFO =
  '#app > div > div.three._aigs > div._aigv._aig-._aohg > span > div > span > div > div > section > div > div> div > span > span';

export const NAME_FROM_CONTACT_INFO =
  '#app > div > div.three._aigs > div._aigv._aig-._aohg > span > div > span > div > div > section > div> div > h2 > div > span';

export const CONTACT_INFO_TAB = 'div[title="Contact info"]';

export const UserContext = createContext<{
  currentUser: string | null;
  setCurrentUser: Dispatch<SetStateAction<string | null>> | null;
}>({ currentUser: null, setCurrentUser: null });
