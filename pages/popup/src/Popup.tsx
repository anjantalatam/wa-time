import '@src/Popup.css';
import { useStorageSuspense, withErrorBoundary, withSuspense } from '@extension/shared';
import { exampleThemeStorage, userStorage } from '@extension/storage';
import type { ComponentPropsWithoutRef } from 'react';

// export async function deleteUserByPhone(phone: string) {
//   console.log('initial users:>>>', await userStorage.get());
//   await userStorage.deleteUser(phone);
//   console.log('after users:>>>', await userStorage.get());
// }

const Popup = () => {
  const theme = useStorageSuspense(exampleThemeStorage);
  const isLight = theme === 'light';
  const logo = isLight ? 'popup/logo_vertical.svg' : 'popup/logo_vertical_dark.svg';

  const injectContentScript = async () => {
    const [tab] = await chrome.tabs.query({ currentWindow: true, active: true });

    await chrome.scripting
      .executeScript({
        target: { tabId: tab.id! },
        files: ['/content-runtime/index.iife.js'],
      })
      .catch(err => {
        if (err.message.includes('Cannot access a chrome:// URL')) {
          alert('You cannot inject script here!');
        }
      });
  };

  return (
    <div className={`App ${isLight ? 'bg-slate-50' : 'bg-gray-800'}`}>
      <header className={`App-header ${isLight ? 'text-gray-900' : 'text-gray-100'}`}>
        <img src={chrome.runtime.getURL(logo)} className="App-logo" alt="logo" />
        <p>
          Edit <code>pages/popup/src/Popup.tsx</code>
        </p>
        <button
          className={
            'font-bold mt-4 py-1 px-4 rounded shadow hover:scale-105 ' +
            (isLight ? 'bg-blue-200 text-black' : 'bg-gray-700 text-white')
          }
          onClick={injectContentScript}>
          Click to inject Content Script
        </button>
        <ToggleButton>Toggle theme</ToggleButton>
        {/* <button
          className="mt-2 p-2 bg-slate-500 color-white"
          onClick={async () => {
            await deleteUserByPhone(
              'Topmate lets you open-up ways so that others can reach out to you for your knowledge or guidance in a more personalised manner!',
            );
          }}>
          delete user
        </button> */}
      </header>
    </div>
  );
};

const ToggleButton = (props: ComponentPropsWithoutRef<'button'>) => {
  const theme = useStorageSuspense(exampleThemeStorage);
  return (
    <button
      className={
        props.className +
        ' ' +
        'font-bold mt-4 py-1 px-4 rounded shadow hover:scale-105 ' +
        (theme === 'light' ? 'bg-white text-black shadow-black' : 'bg-black text-white')
      }
      onClick={exampleThemeStorage.toggle}>
      {props.children}
    </button>
  );
};

export default withErrorBoundary(withSuspense(Popup, <div> Loading ... </div>), <div> Error Occur </div>);
