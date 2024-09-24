import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

export const protectRoute = (WrappedComponent) => {
  const Wrapper = (props) => {
    const { token } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!token) {
        router.push('/login'); // Redirect to login page if not authenticated
      }
    }, [token, router]);

    if (!token) return null; // Optional: Show loading indicator or handle in another way

    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};