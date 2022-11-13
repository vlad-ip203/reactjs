import {Container} from "react-bootstrap"
import Masonry from "react-masonry-css"
import {child, get, getDatabase, ref} from "firebase/database"
import {useEffect, useState} from "react"

import {MASONRY_BREAKPOINT_COLS} from "../../module/app"
import ItemCard from "../../component/card/ItemCard"


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


function Home() {
    const [sites, setSites] = useState([])

    useEffect(() => {
        const db = getDatabase()
        fetchSites(db, setSites)
    }, [])

    return (
        <Container>
            <Masonry breakpointCols={MASONRY_BREAKPOINT_COLS}
                     className="masonry-grid"
                     columnClassName="masonry-grid-column">
                {sites.map((site, index) => {
                    return <ItemCard key={index}
                                     card={site}/>
                })}
            </Masonry>
        </Container>
    )
}

export default Home