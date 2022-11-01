import {Container} from "react-bootstrap";
import Masonry from "react-masonry-css";


const breakpointCols = {
    default: 5,
    1600: 4,
    1200: 3,
    800: 2,
    400: 1
}


function App() {
    return (
        <Container>
            <Masonry breakpointCols={breakpointCols}
                     className='masonry-grid'
                     columnClassName='masonry-grid-column'>
            </Masonry>
        </Container>
    );
}

export default App;