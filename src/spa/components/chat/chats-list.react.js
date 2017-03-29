import React from 'react';

function ChatsList ({ chats }) {
    
    return (
        <div className="chat-list">
            {chats.map((chat) => {
                const onClick = () => {
                    DefaultActions.showChat(chat.handle);
                };
                return <div key={chat.handle} className="chat-item" onClick={onClick}>{chat.handle}</div>
                }
            )}
        </div>
    );
}

export default ChatsList;