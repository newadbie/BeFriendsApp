export interface AuthState {
    userName: string,
    userEmail: string,
    isAuthenticated: boolean,
}

export interface RootState {
    authState: AuthState,
}