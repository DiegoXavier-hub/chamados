import { useContext, useEffect, ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../contexts/auth';

interface AuthProviderProps {
    children: ReactNode;
}

export default function Private({ children }: AuthProviderProps) {
    const navigate = useNavigate();
    const { signed } = useContext(AuthContext);
    const location = useLocation();

    useEffect(() => {
        if (!signed && (location.pathname === '/signIn')) {
            navigate('/signIn');
        } else if (!signed && (location.pathname === '/signUp')) {
            navigate('/signUp');
        } else {
            if (location.pathname === '/signIn' || location.pathname === '/signUp') {
                navigate('/');
            }
        }
    }, [signed, navigate, location.pathname]);

    return children;
}
