import {useState, useEffect} from 'react';
import Link from 'next/link';
import Modal from 'react-modal';
import styles from '../styles/banneredpost.module.css';
import Comment from '../components/comment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faHeart} from '@fortawesome/free-solid-svg-icons'

const BanneredPost = ({ post_id, post_user_id, user_id }) => {
    if (!post_id) {
        return;
    }
    const [modalOpen, setModalOpen] = useState(false);
    const [post, setPost] = useState("");
    const [comment, setComment] = useState("");
    const [isLiked, setIsLiked] = useState(false);
    const [profileBanner, setProfileBanner] = useState({});

    useEffect(() => {
        const allData = async () => {
            const response1 = await fetch(`/api/posts?post_id=${post_id}`);
            if (response1.ok) {
                const data1 = await response1.json();
                setPost(data1);
            }
            const response2 = await fetch(`/api/getLikeStatus?post_id=${post_id}&user_id=${user_id}`);
            if (response2.ok) {
                const data2  = await response2.json();
                setIsLiked(data2.liked);
            }
            const response3 = await fetch(`/api/getProfileBanner?user_id=${post_user_id}`);
            if (response3.ok) {
                const data3 = await response3.json();
                setProfileBanner(data3)
            }
        };
        allData();
    }, [post_id, user_id, post_user_id]);

    const handlePostClick = (e) => {
        e.preventDefault();
        setModalOpen(true);
    };

    const handleModalClose = (e) => {
        setModalOpen(false);
    };

    const handleComment = async (e) => {
        if (comment) {
            await fetch('/api/createcomment', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    post_id: post_id,
                    comment_content: comment,
                    user_id: user_id,
                }),
            })
            setModalOpen(false);
        }
        
    }

    const handleLike = async (e) => {
        const requestOptions = {
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                post_id: post_id,
                user_id: user_id,
            })    
        };
        if (!isLiked) {
            requestOptions.method = 'POST';
            await fetch('../api/like', requestOptions);
        } else {
            await fetch(`../api/like?post_id=${post_id}&user_id=${user_id}`, {
                method: 'DELETE',
            });
        }
        setIsLiked(!isLiked);
    }

    return (
        <div>
            <Link href={`/profile/${profileBanner.id}`} className={styles.profileBannerItem}>
                <img src={profileBanner.profilePicture} className={styles.profilePicture}></img>
                <h2 className={styles.resultUsername}>{profileBanner.username}</h2>
            </Link>
            <Link href='#' onClick={handlePostClick}>
                <img src={post.photo_url} alt={post.post_content} className={styles.smallImage}/>
            </Link>

            <Modal 
                isOpen={modalOpen}
                onRequestClose={handleModalClose}
                contentLabel="Post View"
                className={styles.modalstyle}
            >
            <div className={styles.miniContainer}>
                <img src={post.photo_url} alt={post.post_content} className={styles.largeImage}/>
                <div className={styles.postFooter}>
                    <h2 className={styles.caption}>{post.post_content}</h2>
                    <FontAwesomeIcon icon={faHeart} className={isLiked ? styles.likedIcon : styles.unlikedIcon} onClick={handleLike}/>
                </div>
                  
            </div>
            <div className={styles.miniContainer}>
                <div className={styles.commentContainer}>
                    {post.comments && post.comments.map((comment, index) => (
                            <div key={index}>
                                <Comment user_id={comment.user_id} comment_content={comment.comment_content}/>
                            </div>
                    ))}
                </div>
                <textarea className = {styles.textarea} onChange={(e) => setComment(e.target.value)} placeholder="Comment..."/>
                <button type="submit" className={styles.submitButton} onClick={handleComment}>Comment</button>
                
            </div>
            </Modal>
        </div>
    );
};

export default BanneredPost;