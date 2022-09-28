import logo from './logo.svg';
import './App.css';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <p>
                    Hello, <strike>World</strike> React!
                </p>
                <a className="App-link"
                   href="https://www.w3schools.com/react/react_getstarted.asp"
                   target="_blank"
                   rel="noopener noreferrer">
                    Link to the tutorial used
                </a>
            </header>
        </div>
    );
}

export default App;