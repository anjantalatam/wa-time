type CustomWindow = Window &
  typeof globalThis & {
    getActiveTimeouts: () => Array<{ id: number; callback: string; delay: number }>;
    getActiveIntervals: () => Array<{ id: number; callback: string; delay: number }>;
  };

(function () {
  const originalSetTimeout = window.setTimeout;
  const originalSetInterval = window.setInterval;
  const originalClearTimeout = window.clearTimeout;
  const originalClearInterval = window.clearInterval;

  const activeTimeouts = new Map();
  const activeIntervals = new Map();

  window.setTimeout = function (callback, delay, ...args) {
    const id = originalSetTimeout(callback, delay, ...args);
    activeTimeouts.set(id, { callback, delay, args });
    return id;
  };

  window.setInterval = function (callback, delay, ...args) {
    const id = originalSetInterval(callback, delay, ...args);
    activeIntervals.set(id, { callback, delay, args });
    return id;
  };

  window.clearTimeout = function (id) {
    activeTimeouts.delete(id);
    originalClearTimeout(id);
  };

  window.clearInterval = function (id) {
    activeIntervals.delete(id);
    originalClearInterval(id);
  };

  (window as CustomWindow).getActiveTimeouts = function () {
    return Array.from(activeTimeouts.entries()).map(([id, { callback, delay }]) => ({
      id,
      callback: callback.toString(),
      delay,
    }));
  };

  (window as CustomWindow).getActiveIntervals = function () {
    return Array.from(activeIntervals.entries()).map(([id, { callback, delay }]) => ({
      id,
      callback: callback.toString(),
      delay,
    }));
  };
})();

export const windowWithTimers = window as CustomWindow;

export const deleteActiveIntervals = () => {
  windowWithTimers.getActiveIntervals().map(interval => {
    windowWithTimers.clearInterval(interval.id);
  });
};
