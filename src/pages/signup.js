import { useState } from "react";
import styles from '../styles/login.module.css';
import Link from 'next/link'
import { useRouter } from "next/router";


const Signup = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const router = useRouter();
    const addUser = async () => {
        const response = await fetch('api/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({username, password})
        });
        
    if (response.ok) {
        const newUser = await response.json();
        router.push('/');
        //Do something with newUser
    } else {
        const error = await response.text();
        console.error('Registration failed:', error);
        setError('User already exists.');
    }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        if (!username || !password) {
            setError("Please fill in both fields"); 
            return;
        } 
        await addUser();
    }

    return (
        <div className = {styles.container}>
            <form className = {styles.form} onSubmit={handleSubmit}>
                <div>
                    <h1 className={styles.title}>Sign up</h1>
                    <label className={styles.label}>
                        Username
                        <input
                            type="text"
                            name="username"
                            className={styles.textInput}
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </label>
                    <br />
                    <label className={styles.label}>
                        Password
                        <input
                            type="text"
                            name="password"
                            className={styles.textInput}
                            value={password}
                            onChange = {(e) => setPassword(e.target.value)}
                        />
                    </label>
                    <br />
                    <input type = "submit" value = "Sign up" className={styles.submitInput}/>
                </div>
            </form>
            <div >
                <p className={styles.p}>Have an account? </p>
                <Link href="/"><button className={styles.submitInput} >Log in</button></Link>
            </div>
            <div>
                {error && <p className={styles.errorMsg}>{error}</p>}
            </div>    
        </div>  
    );
}
export default Signup