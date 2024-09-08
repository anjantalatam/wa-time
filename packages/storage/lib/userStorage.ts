import { createStorage } from './base';
import { StorageEnum } from './enums';
import { User, Users, UserStorage } from './types';

const storage = createStorage<Users>(
  'user-storage-key',
  {},
  {
    storageEnum: StorageEnum.Local,
  },
);

export const userStorage: UserStorage = {
  ...storage,
  findUser: async () => {
    await storage.get();
  },
  addUser: async (user: User) => {
    await storage.set(currentUsers => {
      return { ...currentUsers, [user.phone]: user };
    });
  },
  deleteUser: async (phone: string) => {
    await storage.set(currentUsers => {
      delete currentUsers[phone];
      return currentUsers;
    });
  },
  deleteStore: async () => {
    await storage.set({});
  },
};
