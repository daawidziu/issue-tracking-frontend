import React, {useContext, useReducer, createContext} from "react";

type State = { logged: boolean };
type Action = {type: 'login'} | {type: 'logout'};
type Dispatch = (action: Action) => void;
type Props = {children: React.ReactNode};

const AuthContext = createContext<{state: State, dispatch: Dispatch} | undefined>(undefined);

const authReducer = (state: State, action: Action) => {
    switch (action.type) {
        case 'login':
            return {
                logged: true,
            };
        case 'logout':
            return {
                logged: false,
            };
        default:
            throw new Error(`Unhandled action: ${action}`);
    }
}

const AuthProvider = ({ children }: Props) => {
    const [state, dispatch] = useReducer(authReducer, {logged: false});
    const value = {state, dispatch};

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within a AuthProvider')
    }
    return context
}

export {AuthProvider, useAuth};