import { useContext } from 'react'
import { UserContext } from '../../contexts/UserContext';
import ConversationCard from './ConversationCard';
import { useEffect } from 'react';

export const ConversationsBox = ({ setSelectedConversation }) => {

    const { userMessages, userDataChangeDummy, setUserDataChangeDummy } = useContext(UserContext)
    
    useEffect(() => {
    }, [userMessages])

    const handleSelectConversation = (conversationToShow) => {
        setSelectedConversation(conversationToShow)
    }

    return (
        <section className='conversations-section'>
            <div className='conversations-section-header'>
            <h1>Bandeja de entrada</h1>
            </div>
            {userMessages &&
                userMessages.map((conversation, index) => {
                    return (
                        <ConversationCard handleSelectConversation={handleSelectConversation} conversation={conversation} position={index}/>
                    )
                })
            }
        </section>
    )
}
