import React, { useEffect } from "react"
import { Switch, Route, Redirect } from "react-router-dom"
import { ToastContainer } from "react-toastify"

import Users from "./layouts/users"
import Main from "./layouts/main"
import Login from "./layouts/login"
import NavBar from "./components/ui/navBar"
import LogOut from "./layouts/logout"
import ProtectedRoute from "./components/common/protectedRoute"

import AuthProvider from "./hooks/useAuth"

import { useDispatch } from "react-redux"
import { loadQualitiesList } from "./store/qualities"
import { loadProfessionsList } from "./store/professions"

function App() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(loadQualitiesList())
        dispatch(loadProfessionsList())
    }, [])
    return (
        <div>
            <AuthProvider>
                <NavBar />
                <Switch>
                    <ProtectedRoute
                        path="/users/:userId?/:edit?"
                        component={Users}
                    />
                    <Route path="/login/:type?" component={Login} />
                    <Route path="/logout" component={LogOut} />
                    <Route path="/" exact component={Main} />
                    <Redirect to="/" />
                </Switch>
            </AuthProvider>
            <ToastContainer />
        </div>
    )
}

export default App
