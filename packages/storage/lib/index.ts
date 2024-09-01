import { createStorage } from './base';
import { exampleThemeStorage } from './exampleThemeStorage';
import { userStorage } from './userStorage';
import { SessionAccessLevelEnum, StorageEnum } from './enums';
import type { BaseStorage } from './types';

export { exampleThemeStorage, createStorage, StorageEnum, SessionAccessLevelEnum, userStorage };
export type { BaseStorage };
