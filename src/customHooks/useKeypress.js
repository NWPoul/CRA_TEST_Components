import { useEffect,
         useRef     } from 'react';
/**
 * useKeypress
 * @param {string} key - the name of the key to respond to, compared against event.key
 * @param {function} action - the action to perform on key press
 */
export function useKeypress(key, action) {
  useEffect(() => {
    function onKeyup(e) {
    //debugger
     console.log(e.key)
      if (e.key === key) {
          action(e)
          e.preventDefault()
        }
    }
    window.addEventListener('keyup', onKeyup);
    return () => window.removeEventListener('keyup', onKeyup);
  }, [action, key]);
}

export function useKeyCodemap(keyCodeActionMap, optData={}) {
    const keyRepeatedRef = useRef(null)

    useEffect(() => {
        function onKeydown(e) {
            const action = keyCodeActionMap[e.code]
            if ( !action
                || !e.repeat
                ||  e.code === keyRepeatedRef.current) return
            e.preventDefault()
            keyRepeatedRef.current = e.code
            action(e)
        }


        function onKeyup(e) {
            //debugger
             console.log(e.code)
            const action = keyCodeActionMap[e.code]
            if (!action ) return
            if ( keyRepeatedRef.current === e.code ) {
                keyRepeatedRef.current = null
                return
            }

            e.preventDefault()
            action(e)
        }

        window.addEventListener('keyup', onKeyup)
        window.addEventListener('keydown', onKeydown)

        return () => {
            window.removeEventListener('keyup', onKeyup)
            window.removeEventListener('keydown', onKeydown)
        }
    }, [keyCodeActionMap, optData])
}


export default useKeypress