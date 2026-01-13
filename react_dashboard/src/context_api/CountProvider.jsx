import { useState } from "react";
import { CountContext } from "./CountContext";


 

export const CountProvider = ({children}) => {

    const [languageCount,setLangugeCount] = useState({});

    const increseCount = (language) =>{

        setLangugeCount((prev) => ({
            ...prev,
            [language]: (prev[language] || 0) + 1, 
        }));
    }
    const decreaseCount = (language) =>{

        setLangugeCount((prev) => ({
            ...prev,
            [language]: Math.max((prev[language] || 1)-1,0),
        }));
    }

    return(
        <CountContext.Provider value={{languageCount,increseCount,decreaseCount}} >
            {children}
        </CountContext.Provider>
    )


}