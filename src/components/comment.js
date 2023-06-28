import {useState, useEffect} from 'react';
import styles from '../styles/comment.module.css';
import Link from 'next/link';

const Comment = ({user_id, comment_content}) => {

    const [username, setUsername] = useState("");

    useEffect(() => {
        const getUsername = async () => {
            const response = await fetch(`/api/getUsername?user_id=${user_id}`);
            if (response.ok) {
                const data = await response.json();
                setUsername(data);
            }
        };
        getUsername();
    }, [user_id]);

    return (
        <div className={styles.commentContainer}>
            <Link href={`/profile/${user_id}`} className={styles.link}><h4>{username}</h4></Link>
            <p>{comment_content}</p>
        </div>
        
    )
}

export default Comment;