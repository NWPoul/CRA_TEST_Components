import { useState, useEffect, useCallback } from "react";
import  * as store from "store2"


/**
 * useLocalstorage hook
 * Tracks a value within localStorage and updates it
 *
 * @param {string} key - Key of the localStorage object
 * @param {any} defaultValue - Default initial value
 */
function useLocalstorage(key, defaultValue = null) {
  const [value, setValue] = useState(getValueFromLocalStorage());

  function init() {
    const valueLoadedFromLocalStorage = getValueFromLocalStorage();
    if (
      valueLoadedFromLocalStorage === null ||
      valueLoadedFromLocalStorage === "null"
    ) {
      set(defaultValue);
    }
  }

  function getValueFromLocalStorage() {
    const storedValue = store.get(key, null)
    //debugger     console.log(storedValue)
    return storedValue;
  }

  function saveValueToLocalStorage(valueToSet, opt = 'SET') {
    let res = opt === 'ADD' ?
              store.add(key, valueToSet) :
              store.set(key, valueToSet)
    return res
  }

  const set = useCallback((newValue, opt = 'SET') => {
      //debugger       console.trace(newValue)
    if (opt === 'ADD') {
        let testNewValue = {...value, ...newValue}
        //debugger
         console.log(value, testNewValue)
    }
    setValue(newValue);
    saveValueToLocalStorage(newValue, opt);
  }, []);

  const listen = useCallback((event) => {
    if (event.storageArea === localStorage && event.key === key) {
      let newValue = event.newValue
      try {
        newValue = JSON.parse(newValue);
      } catch (error) {
        console.warn('useStorage event got value not for JSON.parse so set value as is', error);
      }
      setValue(newValue);
    }
  }, []);

  // eslint-disable-next-line consistent-return
  const remove = useCallback(() => {
    set(null);
    store.remove(key);
  }, [key]);

  // initialize
  useEffect(() => {
    init();
  }, []);

  // check for changes across windows
  useEffect(() => {
    window.addEventListener("storage", listen);

    return () => {
      window.removeEventListener("storage", listen);
    };
  }, []);

  const handler = [value, set, remove]

  return handler;
}

export { useLocalstorage };