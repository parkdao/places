import { writable } from "svelte/store";

export function localStorageStore<T>(storageKey: string, initialValue: T) {
  let d = {};
  try {
    d = JSON.parse(localStorage.getItem(storageKey));
  } catch (e) {}
  const init = d || initialValue;
  const { subscribe, update, set } = writable<T>(init as T);
  subscribe((state) => {
    if (!state) return;
    debounce(() => {
      localStorage.setItem(storageKey, JSON.stringify(state));
    }, 1000);
  });
  return {
    subscribe,
    update,
    set,
  };
}

let inDebounce;
function debounce(func, delay) {
  const context = this;
  const args = arguments;
  clearTimeout(inDebounce);
  inDebounce = setTimeout(() => func.apply(context, args), delay);
}
