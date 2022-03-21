
import { useState, useEffect } from 'react'
import { useRef, useCallback } from 'react'

import { fetchAPI }            from 'JS/services.mjs'


const useFetch = (url, options) => {
    const [fetchObj, setFetchObj] = useState({
        loading: false,
        data:    undefined,
        error:   undefined
    })

    useEffect(() => {
        if (url) {
            setFetchObj( {loading: true} )
            fetchAPI(url, options)
                .then( res => {
                    setFetchObj({
                        loading: false,
                        data: res
                    })
                })
                .catch((error) => {
                    setFetchObj({
                        loading: false,
                        error
                    })
                })
        }
    }, [])//eslint-disable-line react-hooks/exhaustive-deps


    return {...fetchObj }
} //END useftch


/**
 * @param {Function} onIntersect Function to call once intersected
 * @param {Object} optionsData Options object used to initialize IntersectionObserver
 * @param {boolean} onlyOnce Whether to stop observing after onIntersect is fired once
 *
 * @returns {Object} A ref object created by useRef. Use this to assign to the element you want to observe.
 *
 * Usage:
 * const Component = () => {
 *   const targetRef = useIntersect(() => console.dir('impressed!'))
 *
 *   return <div ref={targetRef}>Something here</div>
 * }
 */
const useIntersect = (onEntries, options = null, onlyOnce = false, skip = false) => {
    const intersected = useRef(false)
    const observer    = useRef(null)
    const targetRef   = useRef()

    const handleIntersect = useCallback(
        entries => {
            const isIntersecting = entries[0]?.isIntersecting || false
            onEntries(entries)
            if (isIntersecting) {
                // onIntersect(entries)
                if (!intersected.current && observer.current && onlyOnce) {
                    observer.current.disconnect()
                    observer.current    = null
                    intersected.current = true
                }
            }
        },
        [onEntries, observer, intersected],//eslint-disable-line react-hooks/exhaustive-deps
    )

    useEffect(() => {
        if (!intersected.current && !observer.current) {
            observer.current = new IntersectionObserver(handleIntersect, options)
            observer.current.observe(targetRef.current)
        }

        return () => {
            console.dir('cleaning')
            if (observer.current) {
                observer.current.disconnect()
                observer.current = null
            }
        }
    }, [handleIntersect, options, targetRef])

    return targetRef
}

function usePrevious(value) {
    const ref = useRef()
    useEffect(() => {
        ref.current = value
    })
    return ref.current
  }



export {
    useFetch,
    useIntersect,
    usePrevious,
}