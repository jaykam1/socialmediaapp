import styles from '../styles/searchresults.module.css';
import Link from 'next/link';

const SearchResults = ({results}) => {
    if (!results || Object.keys(results).length === 0) {
        return;
    }
    console.log(results);
    return (
    <div className={styles.resultsContainer}>
            {results.map((result) => (
                <Link href={`/profile/${result.id}`} className={styles.link}>
                <div className={styles.resultItem} key={result.username}>
                    <img src={result.profile_picture_url} alt="Profile Picture" className = {styles.resultImage} />
                    <div className={styles.nameBox}>
                        <p className={styles.resultUsername}>{result.username}</p>
                    </div>
                </div>
                </Link>
            ))}   
    </div>
    )

}

export default SearchResults;