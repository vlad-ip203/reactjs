import React from "react"
import ReactDOM from "react-dom/client"
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import {initializeApp} from "firebase/app"
import {getAnalytics} from "firebase/analytics"
import {getFirestore} from "firebase/firestore"

import {Site} from "./module/app"
import {GlobalStateProvider} from "./module/context"
import ThemeSelector from "./module/theme"
import Root from "./component/Root"
import Error404 from "./component/page-service/Error404"
import Home from "./component/page-home/Home"
import About from "./component/page-about/About"
import Help from "./component/page-help/Help"
import Bookmarks from "./component/page-bookmarks/Bookmarks"
import Auth from "./component/page-auth/Auth"
import Profile from "./component/page-profile/Profile"


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
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)
export const database = getFirestore(app)


const router = createBrowserRouter([
    {
        path: Site.ROOT,
        element: <Root/>,
        errorElement: <Error404/>,
        children: [
            {index: true, element: <Home/>},
            {path: Site.BOOKMARKS, element: <Bookmarks/>},
            {path: Site.HELP, element: <Help/>},
            {path: Site.ABOUT, element: <About/>},
            {path: Site.AUTH, element: <Auth/>},
            {path: Site.PROFILE, element: <Profile/>},
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