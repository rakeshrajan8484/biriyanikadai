import React, { useEffect } from 'react';
import { HashLink as Link } from 'react-router-hash-link';

const $ = window.$

const Header = (props) => {

    useEffect(() => {
        
        window.onscroll = function () { myFunction() };

        var navbar = document.getElementById("header");
        var sticky = navbar.offsetTop + 100;

        function myFunction() {
            if (window.pageYOffset >= sticky) {
                navbar.classList.add("sticky");

            } else {

                navbar.classList.remove("sticky");

            }
        }
        $(".nav-item .nav-link").on("click", function () {
            $(".nav-item").find(".active").removeClass("active");
            $(this).addClass("active");
        });
    })
    return (<nav id='header' className="navbar navbar-expand-lg pt-3 shadow bg-dark text-light w-100">
        <h6 className="navbar-brand" >Turning Point</h6>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <i className="fas fa-bars"></i>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav ml-auto">
                <Link className="nav-link active" to="#home" smooth>home</Link>
                <Link className="nav-link" to="#offers" smooth>offers</Link>
                <Link className="nav-link" to="#contact" smooth>contact us</Link>
                <button type="button" className="btn btn-outline-light"  data-toggle="modal" data-target="#exampleModal">order now</button>

            </div>
        </div>
    </nav>);
}

export default Header;