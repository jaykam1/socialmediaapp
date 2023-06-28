import { useState, useEffect, useRef } from 'react';
import styles from '../styles/directmessages.module.css';

const DirectMessages = ({message_history, user_id, followed_id}) => {

    const [message, setMessage] = useState("");
    
    if (!message_history || !followed_id) {
        return;
    }


    const handleMessage = async (e) => {
        if (message) {
            const response = await fetch('/api/createmessage', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    sender_id: user_id,
                    message_content: message,
                    receiver_id: followed_id,
                }),
            })
            if (response.ok) {
                setMessage('');
            }    
        }   
    }

    return (
        <div>
            <div className={styles.messageContainer}>
                {message_history.map((message) => (
                    <p className={message.sender_id === user_id ? styles.myMessage : styles.yourMessage}>{message.message_content}</p>
                )
                )}
            </div>
            <textarea className = {styles.textarea} value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Message..."/>
            <button type="submit" className={styles.submitButton} onClick={handleMessage}>Send</button>
        </div>
    )

}

export default DirectMessages;