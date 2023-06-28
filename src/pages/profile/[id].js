import { useRouter } from 'next/router';
import {useState, useEffect} from 'react';
import ProfileBanner from '../../components/profilebanner';
import UserPosts from '../../components/userposts';
import styles from '../../styles/idprofile.module.css';
import Layout from '../../components/layout';
import jwt from 'jsonwebtoken';
import cookie from 'cookie';

const UserProfile = ({user}) => {
    const router = useRouter();
    const {id} = router.query;
    const userId =  user.userId;
    const [userData, setUserData] = useState(null);
    const [postData, setPostData] = useState(null);
    const [isFollowing, setIsFollowing] = useState(false);
    
    const handleFollow = async () => {
        const requestOptions = {
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                followerId: userId,
                followingId: id,
            })
        };
        if (!isFollowing) {
            requestOptions.method = 'POST';
            await fetch('../api/follow', requestOptions);
        } else {
            await fetch(`../api/follow?followerId=${userId}&followingId=${id}`, {
                method: 'DELETE',
            });
        }
        setIsFollowing(!isFollowing);
    }

    

    useEffect(() => {
        if (userId == id) {
            router.push('/profile');
        }
        const allData = async () => {
            const response1 = await fetch(`../api/getProfileData?user_id=${id}`);
            if (response1.ok) {
                const data1 = await response1.json();
                setUserData(data1);    
            }  
            const response2 =  await fetch(`../api/getPostData?user_id=${id}`);
            if (response2.ok) {
                const data2 = await response2.json();
                setPostData(data2);
            }
            const response3 = await fetch(`../api/getFollowStatus?followerId=${userId}&followingId=${id}`);
            if (response3.ok) {
                const data3  = await response3.json();
                setIsFollowing(data3.following);
            }
        };
        allData();
    }, [id, userId]);

    return (
        <div className={styles.container}>
            <Layout/>
            <div className={styles.center}>
                <main className={styles.content}>
                    <ProfileBanner {...userData}/>
                    <button onClick={handleFollow} className={styles.follow}>{isFollowing ? 'Unfollow' : 'Follow'}</button>
                    <hr className = {styles.hr}/>
                    <UserPosts posts={postData} user_id={userId}/>
                    
                </main>
            </div>
        </div>
        
    );
}

export default UserProfile;

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