import { useState, useEffect } from 'react';
import styles from '../styles/userselect.module.css';

const UserSelect = ({user_id, onUserSelect}) => {
    
    const [followed, setFollowed] = useState("");

    useEffect(() => {
        const fetchFollowedUsers = async () => {
            const response1 = await fetch(`/api/getFollowedUsers?user_id=${user_id}`);
            if (response1.ok) {
                const followedIds = await response1.json();
                const followedPromises = followedIds.map(async (followedId) => {
                    const response2 = await fetch(`/api/getProfileBanner?user_id=${followedId.followed_id}`);
                    if (response2.ok) {
                        return response2.json();
                    }
                });
                const followedData = await Promise.all(followedPromises);
                console.log(followedData);
                setFollowed(followedData);
            }
        };
        fetchFollowedUsers();
      }, [user_id]);

    if (!followed) {
        return;
    }

    return (
        <div className={styles.resultContainer}>
            {followed.map((user) => (
                <div key={user.id} className={styles.resultItem} onClick={()=> onUserSelect(user.id)} >
                    <img src={user.profilePicture} className={styles.resultImage}/>
                    <div className={styles.nameBox}>
                        <p className={styles.resultUsername}>{user.username}</p>
                    </div>
                </div>
            ))}
        </div>   
    );
};

export default UserSelect;