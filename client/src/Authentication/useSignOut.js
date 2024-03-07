import { useAuth } from './Auth';
import { useNavigate } from 'react-router-dom';

export const useSignOut = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const signOut = () => {
        localStorage.removeItem('user')
        logout();
        navigate('/'); // Redirect to login page
    };

    return signOut;
};
