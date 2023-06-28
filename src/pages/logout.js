import { useRouter } from 'next/router';

const Logout = () => {
    const logoutUser = async () => {
        const router = useRouter();
        const response = await fetch('api/logout', {
            method : 'GET'
        });

        if (response.ok) {
            router.push('/');
            
        } else {
            const error = await response.text();
            console.error('Logout failed: ', error);
            return;
        }
    }
}

export default Logout;
    
