import "./App.scss";
import { useEffect, useState } from 'react'
import axios from "axios";
import { api } from "./services/api";
import {
    FluentProvider,
    webLightTheme,
    tokens,
    Spinner,
    mergeClasses,
} from "@fluentui/react-components";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PaginaInicial from "./pages/paginaInicial";
import Questionarios from "./pages/quizzes";
import Participantes from "./pages/participants";
import HeaderNavigationBar from "./components/headerNavigationBar";

function App() {

    async function signIn() {
        await api
            .get("users/profile")
            .then((response) => {
                // console.log({response})
            })
            .catch((e) => {
                return e;
            })

    }

    const getQuestions = async () => {
        await api
            .get("questions/all")
            .then((response) => {
                console.log({ response })
            })
            .catch((e) => {
                return e;
            })

    }

    useEffect(() => {
        signIn()
        // getQuestions()
        // getQuestionCatalog()
    }, [])


    return (
        <Router>
            <FluentProvider
                theme={webLightTheme}
                style={{ background: tokens.colorNeutralBackground3 }}
            >
                <div id="app">
                    <HeaderNavigationBar />
                    <main>
                        <Routes>
                            <Route path={"/"} element={<PaginaInicial />} />
                            <Route path={"/questions"} element={<Questionarios />} />
                            <Route path={"/participants"} element={<Participantes />} />
                            <Route path={"/configs"} element={<Participantes />} />
                        </Routes>
                    </main>
                </div>
            </FluentProvider>
        </Router>
    )
}

export default App
