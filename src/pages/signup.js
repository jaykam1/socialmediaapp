import { useState } from "react"

const Signup = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!username || !password) {
            setError("Please fill in both fields"); 
        } else {
            console.log("Form submitted", {username, password})
        }
    };

    return (
        <div>
            <h1>Sign up</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Username:
                    <input
                        type="text"
                        name="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </label>
                <br />
                <label>
                    Password:
                    <input
                        type="password"
                        name="password"
                        value={password}
                        onChange = {(e) => setPassword(e.target.value)}
                    />
                </label>
                <br />
                <input type = "submit" value = "Submit" />
            </form>
            {error && <p>{error}</p>}
            <p>Have an account? </p>
            <button>Log in</button>
        </div>  
    );
}
export default Signup