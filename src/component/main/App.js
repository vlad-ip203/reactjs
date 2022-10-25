import MainMenu from "../nav/MainMenu";

import {Container} from "react-bootstrap";


function App() {
    return (
        <div>
            <header>
                <MainMenu/>
            </header>

            <main><Container>
                <p>
                    Hello, <strike>World</strike> React!
                    <br/>
                    <a className="link"
                       href="https://www.w3schools.com/react/react_getstarted.asp"
                       target="_blank"
                       rel="noopener noreferrer">
                        Link to the tutorial used
                    </a>
                </p>
            </Container></main>
        </div>
    );
}

export default App;