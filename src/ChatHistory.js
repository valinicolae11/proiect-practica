
function ChatHistory({ chatHistory , response}) {
    return (
        <div className="chat">
            {chatHistory.map((item, index) =>
                <div className={`chat-bubble-container ${item.type}-bubble-container`} key={index}>
                    <div className="profile-picture"><img src={`/${item.type}-grogu.jpg`} alt={item.type} height="100%" /></div>
                    <div className={`chat-bubble ${item.type}-bubble`}>
                        {item.data}
                    </div>
                </div>
            )}
            {response &&
                <div className={`chat-bubble-container openai-bubble-container`} key="response">
                    <div className="profile-picture"><img src={`/openai-grogu.jpg`} alt="openai" height="100%" /></div>
                    <div className={`chat-bubble openai-bubble`}>
                        {response}
                    </div>
                </div>  
            }
        </div>
    )
}

export default ChatHistory;