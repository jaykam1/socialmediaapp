import BanneredPost from './banneredpost';
import styles from '../styles/feedposts.module.css';

const FeedPosts = ({posts, user_id}) => {
    if (!posts) {
        return;
    }
    return (
            <div className={styles.outerDiv}>
                    {posts.map((post) => (
                        <div key={post.post_id} className={styles.parent}>
                            <BanneredPost post_id={post.post_id} post_user_id={post.user_id} user_id={user_id} className={styles.userPostImage}> </BanneredPost>
                        </div>
                    ))}
            </div>
        )
}

export default FeedPosts;