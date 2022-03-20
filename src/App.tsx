import React from 'react';
import {Outlet} from "react-router-dom";
import Header from "./components/Header";
import {AuthProvider} from "./contexts/AuthContext";
import './styles/reset.sass';
import styles from './styles/pages/_App.module.sass';

function App() {
    return (
        <AuthProvider>
            <Header/>
            <main className={styles.mainContainer}>
                <Outlet/>
            </main>
        </AuthProvider>
    );
}

export default App;
