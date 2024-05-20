import { jwtDecode } from 'jwt-decode';
import { useCookies } from 'react-cookie';

export function useAuthTokenCookie() {
    const [cookies, setCookie, removeCookie] = useCookies(['access_token']);

    const setAuthToken = (token) => {
        setCookie('access_token', token, { path: '/' });
    };

    const removeAuthToken = () => {
        removeCookie('access_token', { path: '/' });
    };

    return [cookies.access_token, setAuthToken, removeAuthToken];
}

export function useSignIn() {
    const [, setAuthToken] = useAuthTokenCookie();

    return (storedToken) => {
        const decodedToken = jwtDecode(storedToken);
        const userId = decodedToken.userId;
        
        setAuthToken(storedToken);
        window.localStorage.setItem("userId", userId);
        window.location.href = '/';
        console.log('Sign in successful');
    };
}

export function useSignOut() {
    const [, , removeAuthToken] = useAuthTokenCookie();

    return () => {
        removeAuthToken();
        window.localStorage.removeItem('userId');
        window.location.href = '/';
        console.log('Sign out successful');
    };
}

export function useIsSignedIn() {
    const [cookies] = useCookies(['access_token']);
    const token = cookies.access_token;
  
    return token && !isTokenExpired(token);
}

export function isTokenExpired(token) {
    try {
        const decoded = jwtDecode(token);
        if (decoded.exp < Date.now() / 1000) {
            return true;
        }
        return false;
    } catch (err) {
        return true;
    }
}

export function useGetProfile() {
    const { token } = useGetToken();
    return token ? jwtDecode(token) : null;
}

export function useGetToken() {
    const [cookies] = useCookies(['access_token']);
    const token = cookies.access_token;

    return { token };
}