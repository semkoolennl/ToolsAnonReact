import React, { useState, useContext, useEffect } from 'react';
import ProviderProps from './ProviderProps';
import { User, Token } from '../apiclient/toolsanon/types';
import { ApiClientContext } from './ApiClientProvider';
import moment from 'moment-timezone';

export const AuthContext = React.createContext({
    isAuthenticated: false as boolean,
    user: {} as User|null,
    setUser: (user: User) => {},
    login: (email: string, password: string, remember: boolean) => {},
    logout: () => {},
});

export function AuthProvider({ children }: ProviderProps) {
    const { api } = useContext(ApiClientContext);

    const [user, setUser] = useState<User|null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const setAuthState = (user: User|null) => {
        if (user) {
            setUser(user);
            setIsAuthenticated(true);
        } else {
            setUser(null);
            setIsAuthenticated(false);
        }
    }

    const setLocalStorage = (user: User, token: Token) => {
        localStorage.setItem('auth_user', JSON.stringify(user));
        localStorage.setItem('auth_token', JSON.stringify(token));
    };

    const clearLocalStorage = () => {
        localStorage.removeItem('auth_user');
        localStorage.removeItem('auth_token');
    }

    const handleLogin = async (email: string, password: string, remember: boolean) => {
        try {
            const response = await api.auth.login({email: email, password: password});
            api.setToken(response.token);
            setAuthState(response.user);
            if (remember) {
                setLocalStorage(response.user, response.token);
            }
        } catch (error) {
            alert("We couldn't log you in. Please try again later.")
            console.log(error);
        }
    }

    useEffect(() => {
        // check if user with access token exists in local storage
        const storedUser  = localStorage.getItem('auth_user');
        const storedToken = localStorage.getItem('auth_token');

        console.log('storedUser:', storedUser);
        console.log('storedToken:', storedToken);

        if (storedUser && storedToken) {
            let user  = JSON.parse(storedToken) as User;
            let token = JSON.parse(storedUser) as Token;

            let expires_at = moment.tz(token.expires_at, 'UTC');
            if (expires_at.isAfter(moment().format())) {
                api.setToken(token);
                setAuthState(user);
                return;
            }
        }

        setAuthState(null);
    }, []);

    const contextValue = React.useMemo(() => ({
        isAuthenticated: isAuthenticated,
        user: user,
        setUser,
        login: handleLogin,
        logout: () => {
            setAuthState(null);
            clearLocalStorage();
        },
    }), [user, isAuthenticated, api.auth]);

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
}