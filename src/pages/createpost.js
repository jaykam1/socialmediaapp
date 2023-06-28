import Layout from '../components/layout';
import AddPost from '../components/addpost'
import jwt from 'jsonwebtoken';
import cookie from 'cookie';
import styles from '../styles/createpost.module.css'

const CreatePost = ({ user }) => (
    <div className={styles.container}>
        <Layout/>
        <div className={styles.center}>
            <main className={styles.content}>
                <AddPost user={user.userId}/>
            </main>
        </div>
    </div>
)

export default CreatePost;

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