import React from 'react';
import styles from '../styles/profilebanner.module.css';

const ProfileBanner = (user) =>  (
    
  <div className={styles.profileBanner}>
    <img src={user.profilePicture} alt="Profile" className={styles.profileBannerPicture} />

    <div className={styles.profileBannerDetails}>
      <h2 className={styles.profileBannerName}>{user.username}</h2>
      
      <div className={styles.profileBannerStats}>
        <p><strong>Posts:</strong> {user.postCount}</p>
        <p><strong>Followers:</strong> {user.followerCount}</p>
        <p><strong>Following:</strong> {user.followingCount}</p>
      </div>
    </div>
  </div>
);


export default ProfileBanner;
