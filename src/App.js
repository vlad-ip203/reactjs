import './App.css';
import logo from './logo.svg';
import MainMenu from "./components/nav/MainMenu";

function App() {
    return (
        <div className="app">
            <header className="app-header">
                <MainMenu/>
            </header>

            <main>
                <img src={logo} className="app-logo" alt="logo"/>
                <p>
                    Hello, <strike>World</strike> React!
                </p>
                <a className="app-link"
                   href="https://www.w3schools.com/react/react_getstarted.asp"
                   target="_blank"
                   rel="noopener noreferrer">
                    Link to the tutorial used
                </a>
            </main>
        </div>
    );
}

export default App;