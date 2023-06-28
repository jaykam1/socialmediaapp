import Layout from '../components/layout';
import ProfileBanner from '../components/profilebanner';
import UserPosts from '../components/userposts';
import Post from '../components/viewpost';
import jwt from 'jsonwebtoken';
import cookie from 'cookie';
import styles from '../styles/profile.module.css';
import {useState, useEffect} from 'react';
import storage from "../components/firebase"
import { ref, uploadBytes, getDownloadURL} from 'firebase/storage';
import { v4 } from "uuid";
import { useRouter } from "next/router";

const Profile = ({ user }) => {
    const router = useRouter();
    const [userData, setUserData] = useState(null);
    const [postData, setPostData] = useState(null);
    const [imageUpload, setImageUpload] = useState(null);
    const imagesListRef = ref(storage, "images/");

    useEffect(() => {
        const allData = async () => {
            const response1 = await fetch(`api/getProfileData?user_id=${user?.userId}`);
            if (response1.ok) {
                const data1 = await response1.json();
                setUserData(data1);    
            }  
            const response2 =  await fetch(`api/getPostData?user_id=${user?.userId}`);
            if (response2.ok) {
                const data2 = await response2.json();
                setPostData(data2);
            }
        };
        allData();
    }, [user]);

    useEffect(()=> {
        if (imageUpload) {
            addPhoto();
        }
    }, [imageUpload]);

    const addPhoto = () => {
        console.log('Entered add photo');
        if (imageUpload == null) {
            console.log("Null image upload");
            return;
        }
        const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
        uploadBytes(imageRef, imageUpload).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                fetch('/api/changeProfilePicture', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        user_id: user.userId,
                        profile_picture_url: url,
                    }),
                })
                .then(response => response.json())
                .then(newPost => {
                    router.push('/profile');
             })
            .catch(err => console.error(err))
            });    
        });    
    };

    

    return (
        <div className={styles.container}>
            <Layout/>
            <div className={styles.center}>
                <main className={styles.content}>
                    <ProfileBanner {...userData}/>
                    <input
                    type="file"
                    id="fileUpload"
                    className={styles.input}
                    onChange={(event) => {
                    setImageUpload(event.target.files[0]);
                    }}
                    />
                    <label for="fileUpload" className={styles.label}>Change Profile Picture</label>
                    <hr className = {styles.hr}/>
                    <UserPosts posts={postData} user_id={user.userId}/>
                </main>
            </div>
        </div>
        
    );

}

export default Profile

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