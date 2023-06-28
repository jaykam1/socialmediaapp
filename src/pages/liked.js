import Layout from '../components/layout';
import jwt from 'jsonwebtoken';
import cookie from 'cookie';
import styles from '../styles/liked.module.css'
import {useState, useEffect} from 'react';
import UserPosts from '../components/userposts';

const Liked = ({user}) => {
    const [postData, setPostData] = useState(null);
    useEffect(() => {
        const allData = async () => {
            const response =  await fetch(`api/getLikeData?user_id=${user?.userId}`);
            if (response.ok) {
                const data = await response.json();
                setPostData(data);
            }
        };
        allData();
    }, [user]);
    
    
    return (
    
    <div className={styles.container}>
        <Layout/>
        <div className={styles.center}>
            <main className={styles.content}>
                <UserPosts posts={postData} user_id={user.userId}/>
            </main>
        </div>
    </div>
    
)};

export default Liked

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