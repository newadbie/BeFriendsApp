export interface AuthState {
    currentUser: object,
    isAuthenticated: boolean
}

export interface RootState {
    authState: AuthState
}