import { createContext, useState} from 'react'

export const CardContext = createContext();

export const MyCardContextProvider = ({ children }) => {

    const [cardIdChangeDummy, setCardIdChangeDummy] = useState(false)

    return (
        <CardContext.Provider value={{cardIdChangeDummy, setCardIdChangeDummy}}>
            {children}
        </CardContext.Provider>
    )
}