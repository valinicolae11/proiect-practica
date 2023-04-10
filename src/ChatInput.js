
function ChatInput({ handleChange, handleClick }) {
    function handleSubmit(e) {
        e.preventDefault();
    }

    return (
        <div className="input-area">
            <form className="input-container" onSubmit={(e) => handleSubmit(e)}>
                    <input type="text" placeholder="Grogu's wondering what's on your mind..." id="user-input" onChange={(e) => handleChange(e.target.value)}  />
                    <button type="submit" onClick={handleClick}><i className="fas fa-paper-plane"></i></button>
            </form>
        </div>
    )
}

export default ChatInput;