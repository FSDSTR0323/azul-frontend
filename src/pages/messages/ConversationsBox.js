import { useContext } from 'react'
import { UserContext } from '../../contexts/UserContext';
import ConversationCard from './ConversationCard';
import { useEffect } from 'react';

export const ConversationsBox = () => {

    const { userMessages, userDataChangeDummy, setUserDataChangeDummy } = useContext(UserContext)
    
    useEffect(() => {

    }, [userMessages])

    console.log("El mensaje es", userMessages)

    return (
        <section>
            <h1>bandeja de entrada</h1>
            {userMessages &&
                userMessages.map(conversation => {
                    return (
                        <ConversationCard conversation={conversation}/>
                    )
                })
            }
        </section>
    )
}
