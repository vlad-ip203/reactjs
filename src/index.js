import React from "react"
import ReactDOM from "react-dom/client"
import {initializeApp} from "firebase/app"
//import {getAnalytics} from "firebase/analytics";
import {createBrowserRouter, RouterProvider} from "react-router-dom"

import {Log} from "./module/log"
import {Site} from "./module/app"
import reportWebVitals from "./reportWebVitals"
import Root from "./page/Root"
import Error404 from "./page/service/Error404"
import Home from "./page/home/Home"
import About from "./page/about/About"
import Help from "./page/help/Help"
import Bookmarks from "./page/bookmarks/Bookmarks"


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

    databaseURL: "https://cursenreact-js-default-rtdb.europe-west1.firebasedatabase.app"
}

//Initialize Firebase
initializeApp(firebaseConfig)
// const app = initializeApp(firebaseConfig)
// const analytics = getAnalytics(app)


const router = createBrowserRouter([
    {
        path: Site.ROOT,
        element: <Root/>,
        errorElement: <Error404/>,
        children: [
            {index: true, element: <Home/>},
            {path: Site.BOOKMARKS, element: <Bookmarks/>},
            {path: Site.HELP, element: <Help/>},
            {path: Site.ABOUT, element: <About/>}
        ]
    }
])

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>
)


//If you want to start measuring performance in your app, pass a function
//to log results (for example: reportWebVitals(console.log))
//or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(Log.d)