import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useApp } from '../App';
import { useMemo } from 'react';

interface ProtectedRouteProps {
  /**
   * If true, the route requires the user to be authenticated
   * @default true
   */
  requireAuth?: boolean;
  
  /**
   * If true, the route requires the user to have completed onboarding
   * @default false
   */
  requireOnboarding?: boolean;
  
  /**
   * Path to redirect to if the requirements are not met
   * @default '/auth' if requireAuth is true, '/onboarding' if requireOnboarding is true
   */
  redirectTo?: string;
}

/**
 * A higher-order component that protects routes based on authentication and onboarding status
 * 
 * @example
 * // Protect a route that requires authentication
 * <Route element={<ProtectedRoute />}>
 *   <Route path="/dashboard" element={<Dashboard />} />
 * </Route>
 * 
 * @example
 * // Protect a route that requires both authentication and onboarding
 * <Route element={<ProtectedRoute requireOnboarding />}>
 *   <Route path="/settings" element={<Settings />} />
 * </Route>
 * 
 * @example
 * // Protect a route that should only be accessible to unauthenticated users
 * <Route element={<ProtectedRoute requireAuth={false} redirectTo="/dashboard" />}>
 *   <Route path="/login" element={<Login />} />
 * </Route>
 */
export const ProtectedRoute = ({
  requireAuth = true,
  requireOnboarding = false,
  redirectTo,
}: ProtectedRouteProps = {}) => {
  const { user } = useApp();
  const location = useLocation();

  const redirectPath = useMemo(() => {
    // Handle public routes (requireAuth = false)
    if (requireAuth === false) {
      // If user is authenticated, redirect to the specified path (usually dashboard)
      return user ? (redirectTo || '/') : null;
    }
    
    // Handle protected routes (requireAuth = true)
    if (requireAuth) {
      // If user is not authenticated, redirect to auth
      if (!user) {
        return '/auth';
      }
      // If user is authenticated but onboarding is required and not complete
      if (requireOnboarding && !user.onboardingComplete) {
        return '/onboarding';
      }
    }
    
    return null;
  }, [user, requireAuth, requireOnboarding, redirectTo]);

  // If we have a redirect path, navigate to it
  if (redirectPath) {
    // Only navigate if we're not already on the target path to prevent loops
    if (location.pathname !== redirectPath) {
      return <Navigate to={redirectPath} replace />;
    }
    return null; // Prevent rendering anything if we're already on the target path
  }

  // If we get here, render the protected content
  return <Outlet />;
};

export default ProtectedRoute;
