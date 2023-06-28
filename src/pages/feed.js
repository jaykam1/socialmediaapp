import Layout from '../components/layout';
import styles from '../styles/feed.module.css';
import jwt from 'jsonwebtoken';
import cookie from 'cookie';
import FeedPosts from '../components/feedposts';
import {useState, useEffect} from 'react';

const Feed = ({user}) => {

    const [postData, setPostData] = useState(null);

    useEffect(() => {
        const fetchFeed = async () => {
          
            // Fetch the users the current user is following
            const response = await fetch(`/api/getFollowedUsers?user_id=${user?.userId}`);
            if (response.ok) {
                const followedUsers = await response.json();
                const promises = followedUsers.map(async (followedUser) => {
                    const response = await fetch(`/api/getPostDataWithDate?user_id=${followedUser.followed_id}`);
                    if (response.ok) {
                        const userPosts = await response.json();
                        return userPosts;
                    }
                });
                let allPosts = await Promise.all(promises);
                allPosts = allPosts.flat();
                // Sort the posts by date descending
                allPosts.sort((a, b) => new Date(b.post_date) - new Date(a.post_date));
                setPostData(allPosts);    
            }  
        };
        fetchFeed();
      }, [user]);


return (
    <div className={styles.container}>
        <Layout/>
        <div className={styles.center}>
            <main className={styles.content}>
                <FeedPosts posts={postData} user_id={user.userId}/>
            </main>
        </div>
    </div>
)};

export default Feed;

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






