import { useEffect, useState } from 'react';
import { User } from '@extension/storage/lib/types';
import { getUserTime } from './utils';

interface ITime {
  user: User;
}

let currentIntervalId: number | null = null;

function Time({ user }: ITime) {
  const [time, setTime] = useState('');

  useEffect(() => {
    setTime(getUserTime(user));

    const intervalId = setInterval(() => {
      setTime(getUserTime(user));
    }, 1000);

    if (currentIntervalId === null) {
      currentIntervalId = intervalId;
    } else if (currentIntervalId !== intervalId) {
      clearInterval(currentIntervalId);
      currentIntervalId = intervalId;
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [user]);

  return <span className="ml-2 text-xs">{time}</span>;
}

export default Time;
