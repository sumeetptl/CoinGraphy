import { apiClient, ApiResponse } from './api';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  password2: string;
}

export interface AuthResponse {
  access: string;
  refresh: string;
  user?: {
    id: number;
    email: string;
    first_name?: string;
    last_name?: string;
  };
}

export interface User {
  id: number;
  email: string;
  first_name?: string;
  last_name?: string;
  onboardingComplete?: boolean;
}

export class AuthService {
  private static readonly ACCESS_TOKEN_KEY = 'access_token';
  private static readonly REFRESH_TOKEN_KEY = 'refresh_token';
  private static readonly USER_KEY = 'user_data';

  static getAccessToken(): string | null {
    return localStorage.getItem(this.ACCESS_TOKEN_KEY);
  }

  static getRefreshToken(): string | null {
    return localStorage.getItem(this.REFRESH_TOKEN_KEY);
  }

  static getUser(): User | null {
    const userData = localStorage.getItem(this.USER_KEY);
    return userData ? JSON.parse(userData) : null;
  }

  static setTokens(access: string, refresh: string): void {
    localStorage.setItem(this.ACCESS_TOKEN_KEY, access);
    localStorage.setItem(this.REFRESH_TOKEN_KEY, refresh);
  }

  static setUser(user: User): void {
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  static clearAuth(): void {
    localStorage.removeItem(this.ACCESS_TOKEN_KEY);
    localStorage.removeItem(this.REFRESH_TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
  }

  static isAuthenticated(): boolean {
    return !!this.getAccessToken();
  }

  async login(credentials: LoginRequest): Promise<ApiResponse<AuthResponse>> {
    const response = await apiClient.post<AuthResponse>('/auth/login/', credentials);
    
    if (response.data) {
      AuthService.setTokens(response.data.access, response.data.refresh);
      if (response.data.user) {
        AuthService.setUser(response.data.user);
      }
    }
    
    return response;
  }

  async register(userData: RegisterRequest): Promise<ApiResponse<AuthResponse>> {
    const response = await apiClient.post<AuthResponse>('/auth/register/', userData);
    
    if (response.data) {
      AuthService.setTokens(response.data.access, response.data.refresh);
      if (response.data.user) {
        AuthService.setUser(response.data.user);
      }
    }
    
    return response;
  }

  async refreshToken(): Promise<ApiResponse<AuthResponse>> {
    const refreshToken = AuthService.getRefreshToken();
    
    if (!refreshToken) {
      return {
        error: 'No refresh token available',
        status: 401,
      };
    }

    const response = await apiClient.post<AuthResponse>('/auth/refresh/', {
      refresh: refreshToken,
    });

    if (response.data) {
      AuthService.setTokens(response.data.access, response.data.refresh);
    }

    return response;
  }

  async getCurrentUser(): Promise<ApiResponse<User>> {
    const response = await apiClient.get<User>('/auth/me/');
    
    if (response.data) {
      AuthService.setUser(response.data);
    }
    
    return response;
  }

  async logout(): Promise<void> {
    try {
      await apiClient.post('/auth/logout/', {
        refresh: AuthService.getRefreshToken(),
      });
    } catch (error) {
      console.warn('Logout request failed:', error);
    } finally {
      AuthService.clearAuth();
    }
  }

  async initializeAuth(): Promise<User | null> {
    if (!AuthService.isAuthenticated()) {
      return null;
    }

    try {
      const userResponse = await this.getCurrentUser();
      if (userResponse.data) {
        return userResponse.data;
      } else {
        const refreshResponse = await this.refreshToken();
        if (refreshResponse.data) {
          const userResponse = await this.getCurrentUser();
          return userResponse.data || null;
        } else {
          AuthService.clearAuth();
          return null;
        }
      }
    } catch (error) {
      AuthService.clearAuth();
      return null;
    }
  }
}

export const authService = new AuthService();
