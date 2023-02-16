
import Chat from "../../../components/Chat"
import ChatInput from "../../../components/ChatInput"

type Props ={
  params: {
    id: string
  };
};

function ChatPage({params: {id}} : Props) {
   
  return (
    <div className="flex flex-col h-screen overflow-hidden">
        {/* Chat */}
        <Chat chatId={id}/>


          {/* ChatInput */}
          <ChatInput chatId={id}/>
    </div>
  )
}

export default ChatPage