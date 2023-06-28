import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import styles from '../styles/searchbar.module.css';
import { useState, useEffect } from 'react';

const SearchBar = ( { onSearch } ) => {
    const [search, setSearch] = useState("");

    useEffect(() => {
        // Make the API call whenever 'searchTerm' changes
        if (search) {
          // Perform your API call here with the updated 'searchTerm'
          onSearch(search);
        }
      }, [search]);

    const handleInputChange = (e) => {
        setSearch(e.target.value);
    }


    return (
        <div className={styles.search}>
        <FontAwesomeIcon icon={faMagnifyingGlass} className={styles.icon}/>
            <div className={styles.inputBox}>
                <input 
                    type="text"
                    placeholder="Search..."
                    value={search}
                    className={styles.input}
                    onChange={handleInputChange}
                />    
            </div>
        </div>   
    )
    
}

export default SearchBar 