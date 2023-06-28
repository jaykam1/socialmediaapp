import React, { useState } from 'react';
import styles from '../styles/login.module.css';
import Link from 'next/link';
import { useRouter } from 'next/router';

const HomePage = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const router = useRouter();
    const loginUser = async () => {
        const response = await fetch('api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({username, password})
        });

        if (response.ok) {
            router.push('/feed');
        } else {
            const error = await response.text();
            console.error('Login failed: ', error);
            setError("Invalid username or password");
        }

    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        if (!username || !password) {
            setError("Please fill in both fields");
            return;
        } 
        await loginUser();
    };

    return (
        <div className={styles.container}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <div>
                    <h1 className={styles.title}>Login </h1>
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
                            type="password"
                            name="password"
                            className={styles.textInput}
                            value={password}
                            onChange = {(e) => setPassword(e.target.value)}
                        />
                    </label>
                    <br />
                    <input type = "submit" value = "Login" className = {styles.submitInput}/>
                </div>  
            </form>
            <div>
                <p className = {styles.p}>Don't have an account? </p>
                <Link href="/signup"><button className={styles.submitInput}>Sign up</button></Link>    
            </div>  
            <div className = {styles.center}>
                {error && <p className={styles.errorMsg}>{error}</p>}
            </div>    
        </div>
    );
};
  export default HomePage;


