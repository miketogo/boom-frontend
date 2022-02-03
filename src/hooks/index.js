import { useEffect, useRef, useState } from "react";

export function useLocalStorage(name) {
    const getItem = () => JSON.parse(localStorage.getItem(name));
    const [state, setstate] = useState(getItem());
    const setItem = value => {
        if(typeof value === "function") {
            value = value(getItem())
        }
        localStorage.setItem(name, JSON.stringify(value))
        setstate(value)
    }

    return [state, setItem]
}

export function useEscapeKey (updaterFunction) {
    useEffect(() => {
        const ifEscape = (e) => e.key === "Escape" && updaterFunction(false)
        document.addEventListener("keydown", ifEscape)        
        return () => {
            document.removeEventListener("keydown", ifEscape);
        }
    }, [updaterFunction])
}


export function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    }, [value]); 
    return ref.current;
}