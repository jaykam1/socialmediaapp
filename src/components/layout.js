import styles from '../styles/layout.module.css';
import { faHouse, faMagnifyingGlass, faPaperPlane, faHeart, faSquarePlus, faUser, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Layout({user}) {
    const router = useRouter();

    const handleLogout = async () => {
        const response = await fetch('/api/logout', {
            method: 'POST',
            headers: {'Content-Type': 'application/json',
        },
    });
    
    if (response.ok) {
        router.push('/');
    } else {
        console.error('Failed to logout');
    }
    };

    return (
        
            <div>
                <nav className={styles.sidenav}>
                <ul>
                    <li><Link href="/feed"><FontAwesomeIcon icon={faHouse} className={styles.navIcon} /></Link></li>
                    <li><Link href="/search"><FontAwesomeIcon icon={faMagnifyingGlass} className={styles.navIcon} /></Link></li>
                    <li><Link href="/messages"><FontAwesomeIcon icon={faPaperPlane} className={styles.navIcon} /></Link></li>
                    <li><Link href="/liked"><FontAwesomeIcon icon={faHeart} className={styles.navIcon} /></Link></li>
                    <li><Link href="/createpost"><FontAwesomeIcon icon={faSquarePlus} className={styles.navIcon} /></Link></li>
                    <li><Link href="/profile"><FontAwesomeIcon icon={faUser} className={styles.navIcon} /></Link></li>
                    <li><a onClick={handleLogout}><FontAwesomeIcon icon={faRightFromBracket} className={styles.navIcon} /></a></li>
                </ul>
                </nav>
            </div>
        
    );
}
    

