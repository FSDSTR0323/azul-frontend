import { useContext } from 'react'
import { UserContext } from '../../contexts/UserContext';
import ConversationCard from './ConversationCard';
import { useEffect } from 'react';

export const ConversationsBox = () => {

    const { userMessages, selectedConversation, userMessagesDataDummy, setUserMessagesDataDummy } = useContext(UserContext)
    
    useEffect(() => {
    }, [userMessages])

    const handleSelectConversation = (conversationIdToShow) => {
        selectedConversation.current = conversationIdToShow
        setUserMessagesDataDummy(!userMessagesDataDummy)
    }

    return (
        <section className='conversations-section'>
            <div className='conversations-section-header'>
            <h1>Bandeja de entrada</h1>
            </div>
            {userMessages &&
                userMessages.map((conversation, index) => {
                    return (
                        <ConversationCard key={conversation.conversation._id} handleSelectConversation={handleSelectConversation} conversation={conversation} />
                    )
                })
            }
        </section>
    )
}
