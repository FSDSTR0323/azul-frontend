import { PrivatePageValidator } from "../../components/privatePageValidator";
import { Header } from "../../components/header";
import Footer from "../../components/footer";
import { ConversationsBox } from "./ConversationsBox"
import { MessageBox } from "./MessageBox";
import { useState } from "react";
import { UserContext } from '../../contexts/UserContext';
import { useContext } from "react";
import { useEffect } from "react";

export const Messages = () => {

    const { userData, userMessages } = useContext(UserContext)
    const [ selectedConversation, setSelectedConversation ] = useState({})

    useEffect(() => {

    }, [userData])

    return (
        <PrivatePageValidator>
            <Header />
            <main className="inbox-wrapper">
                <ConversationsBox setSelectedConversation={setSelectedConversation}/>
                <MessageBox selectedConversation={selectedConversation}/>
            </main>
            <Footer />
        </PrivatePageValidator>
    )
};