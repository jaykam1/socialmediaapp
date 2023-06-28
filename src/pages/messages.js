import Layout from '../components/layout';
import jwt from 'jsonwebtoken';
import cookie from 'cookie';
import styles from '../styles/messages.module.css';
import UserSelect from '../components/userselect';
import DirectMessages from '../components/directmessages';
import {useState, useEffect, useRef} from 'react';

const Messages = ({user}) => {

    const [messageHistory, setMessageHistory] = useState(null);
    const [followedId, setFollowedId] = useState(null);

    const handleClick = async (followed_id = followedId) => {
        setFollowedId(followed_id);
        const response = await fetch(`/api/getMessageHistory?user_id=${user?.userId}&followed_id=${followed_id}`);
        if (response.ok) {
            const data = await response.json();
            setMessageHistory(data);
        }
        
    }

    useEffect(() => {
        if (followedId) {
            handleClick();
        }

        const intervalId = setInterval(() => {
            handleClick(); 
        }, 1000);

        return () => clearInterval(intervalId); 
    }, [followedId]);

    
    return (
    <div className={styles.container}>
        <Layout></Layout>
        <div className={styles.center}>
            <main className={styles.content}>
                <div className={styles.userList}>
                    <UserSelect user_id={user?.userId} onUserSelect={handleClick}/>
                </div>
                <div className={styles.messages}>
                    <DirectMessages message_history={messageHistory} user_id={user?.userId} followed_id={followedId}/>
                </div>
            </main>
        </div>
    </div>
    
)};

export default Messages

export async function getServerSideProps(context) {
    const { req } = context;
    const cookies = cookie.parse(req.headers.cookie || '');
    const token = cookies.token;

    if (!token) {
        return {
            redirect: {
              permanent: false,
              destination: "/",
            },
            props: {},
        };
    }

    let decoded;
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
        console.error(err);
        return {
            redirect: {
              permanent: false,
              destination: "/",
            },
            props: {},
        };
    }

    return {
        props: { user: decoded},
    };
}