import React, {useEffect, useState} from "react";
import './main.global.scss'
import {hot} from "react-hot-loader/root";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Layout} from "./shared/Layout";
import {Header} from "./shared/Header";
import {MainPage} from "./shared/Pages/MainPage";
import {StatsPage} from "./shared/Pages/StatsPage";

function AppComponent() {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])


    return (
        <>
            {mounted && (
                <BrowserRouter>
                    <Layout>
                        <Header />
                        <Routes>
                            <Route path="/" element={<MainPage />}/>
                            <Route path="/stats" element={<StatsPage/>}/>
                        </Routes>
                    </Layout>
                </BrowserRouter>
            )}
        </>

    )
}

export const App = hot(() => (
    <AppComponent/>
))