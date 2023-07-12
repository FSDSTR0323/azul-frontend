import { PrivatePageValidator } from "../../components/privatePageValidator";
import { Header } from "../../components/header";
import Footer from "../../components/footer";
import { ConversationsBox } from "./ConversationsBox"
import { MessageBox } from "./MessageBox";

export const Messages = () => {
    return (
        <PrivatePageValidator>
            <Header />
            <main className="inbox-wrapper">
                <ConversationsBox />
                <MessageBox />
            </main>
            <Footer />
        </PrivatePageValidator>
    )
};