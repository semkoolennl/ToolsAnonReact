import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks';

interface Props {
    redirectTo?: string;
    reverse?: boolean;
}

export default function RouteWrapper({ redirectTo = '#', reverse = false}: Props) {
    const auth = useAuth();

    if (reverse) {
        if (auth.isAuthenticated) {
            return <Navigate to={redirectTo} />;
        }
    } else {
        if (!auth.isAuthenticated) {
            return <Navigate to={redirectTo} />;
        }
    }

    return (
        <Outlet />
    );
}

