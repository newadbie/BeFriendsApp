export interface AuthState {
    // currentUser: object,
    userEmail: string,
    isAuthenticated: boolean,
}

export interface RootState {
    authState: AuthState,
}