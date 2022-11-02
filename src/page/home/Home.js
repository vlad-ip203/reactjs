import {Container} from "react-bootstrap"
import Masonry from "react-masonry-css"
import {child, get, getDatabase, ref} from "firebase/database"
import {useEffect, useState} from "react"

import ItemCard from "../../component/search/ItemCard"


function fetchSites(db, update) {
    const dbRef = ref(db)

    get(child(dbRef, `sites`))
        .then(snapshot => {
                if (snapshot.exists()) {
                    const json = snapshot.toJSON()
                    const keys = Object.keys(json)
                    const out = keys.map((key, index) => {
                        const site = json[key]
                        return {
                            key: index,
                            title: site.title,
                            description: site.description,
                            address: site.address,
                            domain: site.domain
                        }
                    })
                    update(out)
                } else
                    console.error("No data received, can't update site list")
            }
        ).catch(reason => {
            console.error(reason)
        }
    )
}


const breakpointCols = {
    default: 5,
    1600: 4,
    1200: 3,
    800: 2,
    400: 1
}


function App() {
    const [sites, setSites] = useState([])

    useEffect(() => {
        const db = getDatabase()
        fetchSites(db, setSites)
    }, [])

    return (
        <Container>
            <Masonry breakpointCols={breakpointCols}
                     className="masonry-grid"
                     columnClassName="masonry-grid-column">
                {sites.map(item => {
                    return <ItemCard key={item.key}
                                     card={{
                                         icon: item.icon,
                                         title: item.title,
                                         description: item.description,
                                         address: item.address,
                                         domain: item.domain
                                     }}/>
                })}
            </Masonry>
        </Container>
    )
}

export default Home