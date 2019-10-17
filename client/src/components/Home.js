import React,{Fragment} from 'react'
import { Link } from 'react-router-dom'
import elon from "../logos/elon.png";
const Home = () => {
    return (
        <Fragment>      
            <ul class = "nav justify-content-around text-uppercase">
             <li class="nav-item ">
            <Link to='/launches'> <h3 class="nav-link ">Launches</h3></Link>
            </li>
            <li class="nav-item">
            <Link to='/rockets'> <h3 class="nav-link">Rockets</h3></Link>
            </li>
            <li class="nav-item">
            <Link to='/ships'> <h3 class="nav-link">Ships</h3></Link>
            </li>

</ul>

            <img
              src={elon}
              alt="SpaceX"
              style={{ width: 200, display: "block", margin: "auto",
              paddingTop: "8rem" }}
            />
        </Fragment>
    )
}

export default Home