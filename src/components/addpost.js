import { useState, useEffect } from 'react';
import storage from "./firebase.js"
import { ref, uploadBytes, getDownloadURL} from 'firebase/storage';
import { v4 } from "uuid";
import { useRouter } from "next/router";
import styles from '../styles/addpost.module.css';

const AddPost = ({user}) => {
    const router = useRouter();
    const [description, setDescription] = useState("");
    const [imageUpload, setImageUpload] = useState(null);
    
    const imagesListRef = ref(storage, "images/");

    const addPost = () => {
        if (imageUpload == null) return;
        const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
        uploadBytes(imageRef, imageUpload).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                fetch('/api/createpost', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        userId: user,
                        description: description,
                        imageUrl: url,
                    }),
                })
                .then(response => response.json())
                .then(newPost => {
                    router.push('/feed');
             })
            .catch(err => console.error('Error somewhere'))
            });    
        });    
    };

    return (
        <div>
            <div className={styles.imageContainer}>
                {imageUpload && <img src={URL.createObjectURL(imageUpload)} alt="Post" className={styles.image}/>}
            </div>
            <div className={styles.centeredContent}>
                <input
                    type="file"
                    className = {styles.input}
                    onChange={(event) => {
                    setImageUpload(event.target.files[0]);
                    }}
                />
            </div>
            <div>
                <textarea
                    type="text"
                    placeholder="Enter caption..."
                    value={description}
                    className = {styles.textarea}
                    onChange={(e) => setDescription(e.target.value)}    
                />
            </div>
            <div className={styles.centeredContent}>
                <button onClick={addPost} className={styles.submitInput}>Post</button>
            </div>
            
        </div>
    );
};

export default AddPost;