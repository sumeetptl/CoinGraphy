import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TrendingUp } from 'lucide-react';
import { useApp } from '../App';
import { authService, LoginRequest, RegisterRequest } from '../services/auth';
import { getErrorMessage } from '../services/api';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [repeatPasswordError, setRepeatPasswordError] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState('');
  const navigate = useNavigate();
  const { setUser } = useApp();

  const validatePassword = (password: string) => {
    if (password.length < 8) {
      return 'Password must be at least 8 characters long';
    }
    if (!/(?=.*[a-z])/.test(password)) {
      return 'Password must contain at least one lowercase letter';
    }
    if (!/(?=.*[A-Z])/.test(password)) {
      return 'Password must contain at least one uppercase letter';
    }
    if (!/(?=.*\d)/.test(password)) {
      return 'Password must contain at least one number';
    }
    return '';
  };

  const validateRepeatPassword = (repeatPassword: string, password: string) => {
    if (repeatPassword !== password) {
      return 'Passwords do not match';
    }
    return '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError('');
    
    // Validate passwords for signup
    if (!isLogin) {
      const passwordValidationError = validatePassword(password);
      const repeatPasswordValidationError = validateRepeatPassword(repeatPassword, password);
      
      setPasswordError(passwordValidationError);
      setRepeatPasswordError(repeatPasswordValidationError);
      
      if (passwordValidationError || repeatPasswordValidationError) {
        return;
      }
    }
    
    setIsLoading(true);
    
    try {
      let response;
      
      if (isLogin) {
        const loginData: LoginRequest = { email, password };
        response = await authService.login(loginData);
      } else {
        const registerData: RegisterRequest = { email, password, password2: repeatPassword };
        response = await authService.register(registerData);
      }
      
      if (response.error) {
        setApiError(getErrorMessage(response));
        return;
      }
      
      if (response.data) {
        const userData = {
          email,
          onboardingComplete: false,
          ...response.data.user,
        };
        
        setUser(userData);
        navigate('/onboarding');
      }
    } catch (error) {
      setApiError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          <span className="text-gray-900 text-xl">The Real Crypto G</span>
        </div>

        {/* Auth Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          {/* Tabs */}
          <div className="flex gap-4 mb-8 border-b border-gray-200">
            <button
              onClick={() => setIsLogin(true)}
              className={`pb-3 px-1 transition-colors ${
                isLogin
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Log in
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`pb-3 px-1 transition-colors ${
                !isLogin
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Sign up
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {apiError && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-sm text-red-600">{apiError}</p>
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm text-gray-700 mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm text-gray-700 mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (!isLogin) {
                    setPasswordError(validatePassword(e.target.value));
                    if (repeatPassword) {
                      setRepeatPasswordError(validateRepeatPassword(repeatPassword, e.target.value));
                    }
                  }
                }}
                required
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  passwordError ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="••••••••"
              />
              {!isLogin && passwordError && (
                <p className="mt-1 text-sm text-red-600">{passwordError}</p>
              )}
            </div>

            {!isLogin && (
              <div>
                <label htmlFor="repeatPassword" className="block text-sm text-gray-700 mb-2">
                  Repeat Password
                </label>
                <input
                  id="repeatPassword"
                  type="password"
                  value={repeatPassword}
                  onChange={(e) => {
                    setRepeatPassword(e.target.value);
                    setRepeatPasswordError(validateRepeatPassword(e.target.value, password));
                  }}
                  required
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    repeatPasswordError ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="••••••••"
                />
                {repeatPasswordError && (
                  <p className="mt-1 text-sm text-red-600">{repeatPasswordError}</p>
                )}
              </div>
            )}

            {!isLogin && (
              <div className="flex items-start gap-3">
                <input
                  id="terms"
                  type="checkbox"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  required
                  className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="terms" className="text-sm text-gray-600">
                  I understand this is not investment or tax advice.
                </label>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  {isLogin ? 'Logging in...' : 'Creating account...'}
                </span>
              ) : (
                isLogin ? 'Log in' : 'Create account'
              )}
            </button>

            <div className="text-center text-sm">
              {isLogin ? (
                <button
                  type="button"
                  onClick={() => setIsLogin(false)}
                  className="text-blue-600 hover:text-blue-700"
                >
                  New here? Create account
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsLogin(true)}
                  className="text-blue-600 hover:text-blue-700"
                >
                  Already have an account? Log in
                </button>
              )}
            </div>
          </form>
        </div>

        <p className="text-center text-sm text-gray-500 mt-6">
          By continuing, you agree this tool is for educational purposes only.
        </p>
      </div>
    </div>
  );
}
