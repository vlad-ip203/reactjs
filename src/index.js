import React from "react"
import ReactDOM from "react-dom/client"
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import {initializeApp} from "firebase/app"
import {getAnalytics} from "firebase/analytics"
import {getFirestore} from "firebase/firestore"

import {App} from "./module/const"
import {GlobalStateProvider} from "./module/context"
import ThemeSelector from "./module/theme"
import Root from "./component/Root"
import Error404 from "./component/page-service/Error404"
import Home from "./component/page-home/Home"
import About from "./component/page-about/About"
import Bookmarks from "./component/page-bookmarks/Bookmarks"
import Auth from "./component/page-auth/Auth"
import Profile from "./component/page-profile/Profile"
import Search from "./component/page-search/Search"
import Console from "./component/page-console/Console"


//Your Firebase configuration
// noinspection SpellCheckingInspection
const firebaseConfig = {
    apiKey: "AIzaSyAw8ZJ-8tQtvz4Grj3qzavVSQE6xjD8Rng",
    authDomain: "cursenreact-js.firebaseapp.com",
    projectId: "cursenreact-js",
    storageBucket: "cursenreact-js.appspot.com",
    messagingSenderId: "1072824985855",
    appId: "1:1072824985855:web:6c103b7f169956da8804ca",
    //For Firebase JS SDK v7.20.0 and later, measurementId is optional
    measurementId: "G-DKB13LDD45",

    databaseURL: "https://cursenreact-js.firebaseio.com",
}

//Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig)
const analytics = getAnalytics(firebaseApp)
export const database = getFirestore(firebaseApp)


const router = createBrowserRouter([
    {
        path: App.ROOT,
        element: <Root/>,
        errorElement: <Error404/>,
        children: [
            {index: true, element: <Home/>},
            {path: App.SEARCH, element: <Search/>},
            {path: App.ABOUT, element: <About/>},
            {path: App.AUTH, element: <Auth/>},
            {path: App.PROFILE, element: <Profile/>},
            {path: App.CONSOLE, element: <Console/>},
            {path: App.BOOKMARKS, element: <Bookmarks/>},
        ],
    },
])

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
    <React.StrictMode>
        <GlobalStateProvider>
            <ThemeSelector>
                <RouterProvider router={router}/>
            </ThemeSelector>
        </GlobalStateProvider>
    </React.StrictMode>,
)