import  React from "react";
import {Link} from "react-router-dom";

export default function HeaderComponent(){
    return(
        <header>
            <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                <div></div>
                <ul className="navbar-nav">
                    <li ><Link className="nav-link" to="/"> Home </Link></li>
                    <li ><Link className="nav-link" to="/cart"> Cart </Link></li>
                </ul>


            </nav>
        </header>

    )
}
