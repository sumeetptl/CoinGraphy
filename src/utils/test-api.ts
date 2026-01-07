// Test script to verify API integration
import { authService, AuthService } from '../services/auth';

export const testAuthAPI = async () => {
  console.log('Testing API integration...');
  
  // Test login with provided credentials
  try {
    console.log('Testing login...');
    const loginResponse = await authService.login({
      email: 'user@example.com',
      password: 'password'
    });
    
    console.log('Login response:', loginResponse);
    
    if (loginResponse.data) {
      console.log('Login successful!');
      console.log('Access token:', AuthService.getAccessToken());
      console.log('User:', AuthService.getUser());
      
      // Test getting current user
      console.log('Testing getCurrentUser...');
      const userResponse = await authService.getCurrentUser();
      console.log('Current user response:', userResponse);
      
      // Test token refresh
      console.log('Testing token refresh...');
      const refreshResponse = await authService.refreshToken();
      console.log('Refresh response:', refreshResponse);
      
    } else {
      console.log('Login failed:', loginResponse.error);
    }
  } catch (error) {
    console.error('Test failed:', error);
  }
};

// Test registration
export const testRegistration = async () => {
  try {
    console.log('Testing registration...');
    const registerResponse = await authService.register({
      email: 'test@example.com',
      password: 'password123',
      password2: 'password123'
    });
    
    console.log('Registration response:', registerResponse);
  } catch (error) {
    console.error('Registration test failed:', error);
  }
};
