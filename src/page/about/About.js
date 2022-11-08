import React from "react"
import {Container} from "react-bootstrap"


const About = () => {
    return (
        <Container>
            <h1>About</h1>
            <p>A coursework at IFNTUOG about ReactJS website development</p>

            <hr/>

            <h2>Scripts</h2>
            <p>Here's what you can run in the project directory</p>

            <h3>Run</h3>
            <p>To run the app in the development mode execute</p>
            <pre><code>npm start</code></pre>
            <p>Open <a href="http://localhost:3000">http://localhost:3000</a> to view it in your browser</p>
            <p>The page will automatically reload when you make changes</p>
            <p>You may also see any lint errors in the console</p>

            <h3>Test</h3>
            <p>Launch the test runner in the interactive watch mode</p>
            <pre><code>npm test</code></pre>
            <p>See <a href="https://facebook.github.io/create-react-app/docs/running-tests">running tests</a> for
                more info</p>

            <h3>Build & Deploy</h3>
            <p>Build the app for production to the <code>build</code> folder</p>
            <pre><code>npm run build</code></pre>
            <p>It correctly bundles ReactJS in production mode and optimizes the build for the best performance</p>
            <p>The build is minified and the filenames include the hashes</p>
            <p>Your app is ready to be deployed!</p>
            <p>See <a href="https://facebook.github.io/create-react-app/docs/deployment">deployment</a> for more info
            </p>

            <hr/>

            <h2>Setup</h2>
            <p>Some notes about the project dependencies</p>

            <h3>Bootstrap</h3>
            <p>General styles and components</p>
            <pre><code>
                npm install bootstrap
                <br/>
                npm install react-bootstrap
            </code></pre>
            <p><a href="https://react-bootstrap.netlify.app/getting-started/introduction">Docs</a></p>

            <h3>ReactRouter</h3>
            <p>Site navigation</p>
            <pre><code>npm install react-router-dom</code></pre>
            <p>Then follow the documentation to make your website behave the way you expect it to</p>
            <p><a href="https://reactrouter.com/en/main/start/tutorial">Docs</a></p>

            <h3>Masonry</h3>
            <p>Card columns layout</p>
            <pre><code>
                    npm install react-masonry-css
            </code></pre>
            <p>Add global CSS styles to <code>root.css</code></p>
            <pre><code>{`.masonry-grid {
    display: -webkit-box; /* Not needed if autoprefixing */
    display: -ms-flexbox; /* Not needed if autoprefixing */
    display: flex;
    margin-left: -30px; /* gutter size offset */
    width: auto;
}
.masonry-grid-column {
    padding - left: 30px; /* gutter size */
    background-clip: padding-box;
}

/* Style items */
.masonry-grid-column > div { /* change div to reference your elements you put in <Masonry> */
    margin - bottom: 30px;
}`}</code></pre>
            <p><a href="https://www.npmjs.com/package/react-masonry-css">Source</a></p>

            <h3>Firebase</h3>
            <p>Backend for the project</p>
            <pre><code>npm install firebase</code></pre>
            <p>Link with the project</p>
            <pre><code>{`// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAw8ZJ-8tQtvz4Grj3qzavVSQE6xjD8Rng",
  authDomain: "cursenreact-js.firebaseapp.com",
  projectId: "cursenreact-js",
  storageBucket: "cursenreact-js.appspot.com",
  messagingSenderId: "1072824985855",
  appId: "1:1072824985855:web:6c103b7f169956da8804ca",
  measurementId: "G-DKB13LDD45"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);`}</code></pre>
        </Container>
    )
}

export default About