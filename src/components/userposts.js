import styles from '../styles/userposts.module.css';
import Post from '../components/viewpost';

const UserPosts = ({posts, user_id}) => {
    if (!posts) {
        return;
    }
    return (
            <div className={styles.outerDiv}>
                    {posts.map((post) => (
                        <div key={post.post_id} className={styles.parent}>
                            <Post post_id={post.post_id} user_id={user_id} className={styles.userPostImage}> </Post>
                        </div>
                    ))}
            </div>
        )
}
    
export default UserPosts;
