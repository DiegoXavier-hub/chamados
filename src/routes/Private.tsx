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
        if (!signed && (location.pathname === '/signin')) {
            navigate('/signin');
            console.log('oi')
        } else if (!signed && (location.pathname === '/signup')) {
            navigate('/signup');
            console.log('ola')
        } else if (!signed && location.pathname === '/') {
            navigate('/signin');
            console.log('oii')
        } else if (signed && (location.pathname === '/signin' || location.pathname === '/signup')) {
            navigate('/');
            console.log('olaa')
        }
    }, [signed, navigate, location.pathname]);

    return children;
}
