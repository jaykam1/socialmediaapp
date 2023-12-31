import Layout from '../components/layout';
import SearchBar from '../components/searchbar';
import SearchResults from '../components/searchresults';
import jwt from 'jsonwebtoken';
import cookie from 'cookie';
import styles from '../styles/search.module.css'
import {useState} from 'react';


const Search = ({ user }) => {

    const [searchResults, setSearchResults] = useState(null);

    const handleSearch = async (searchTerm) => {
        const requestBody = {
            userId: user.userId,
            searchTerm: searchTerm,
        };
        const response = await fetch('/api/getUsers', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(requestBody)
        });
        if (response.ok) {
            const users = await response.json();
            setSearchResults(users);
        }
    }
    
    return (
    <div className={styles.container}>
        <Layout/>
        <div className={styles.center}>
            <main className={styles.content}>
                <SearchBar onSearch={handleSearch}></SearchBar>
                <hr></hr>
                <SearchResults results={searchResults}></SearchResults>
                
            </main>
        </div>
    </div>
    );
}
export default Search

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