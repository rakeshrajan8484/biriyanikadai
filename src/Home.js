import React, { useState, useEffect } from 'react';
import Header from './header';
import Offers from './Offers';
import Contact from './Contact';
import Footer from './Footer';
import Geocode from "react-geocode";
import toastr from 'toastr'



Geocode.setApiKey("AIzaSyAKL5b6WbvtUMfxrocrpNzj1IMj7NrPgV0");

const Home = () => {
    useEffect(() => {
        getCurrentLocation()
    })
    const getCurrentLocation = async () => {
        navigator.geolocation.getCurrentPosition(
            position => {
                let region = {
                    latitude: parseFloat(position.coords.latitude),
                    longitude: parseFloat(position.coords.longitude),
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                };

                setRegion(region)
                setLat(position.coords.latitude)
                setLong(position.coords.longitude)
            },
            error => console.log(error),
            {
                enableHighAccuracy: true,
                timeout: 20000,
                maximumAge: 1000
            }
        );
        Geocode.fromLatLng(lat, lng).then(
            response => {
                const address = response.results[0].formatted_address;
                setAddress(address)
            },
            error => {
                console.error(error);
            }
        );
    }
    const [region, setRegion] = useState()
    const [initialRegion, setInitialRegion] = useState()
    const [lat, setLat] = useState(0)
    const [lng, setLong] = useState(0)
    const [address, setAddress] = useState("")
    const [response, setResponse] = useState("")
    const [quantity, setQuantity] = useState(0)
    const [phone, setPhone] = useState()
    const [amount, setAmount] = useState(0)
    const handlyChange = (e) => {
        console.log(e);
        setQuantity(e)
        setAmount(e * 100)
    }
    const handlePhone = (e) => {
        setPhone(e)
    }
    const handleSubmit = async () => {
        const response = await fetch('/api/orderFood', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ phone, quantity, amount, address }),
        });
        const body = await response.json();
        setResponse(body)
        toastr.options = {
            "closeButton": false,
            "debug": false,
            "newestOnTop": false,
            "progressBar": false,
            "positionClass": "toast-bottom-right",
            "preventDuplicates": false,
            "onclick": null,
            "showDuration": "300",
            "hideDuration": "1000",
            "timeOut": "5000",
            "extendedTimeOut": "1000",
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut"
        }
        toastr["success"]("your order is made. we will get back to you shortly")
        setPhone("")
        setQuantity("")

    }
    return (<React.Fragment>
        <Header />

        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">order your biriyani</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form onSubmit={handleSubmit}>
                            <div class="form-group">
                                <label for="phone">phone number</label>
                                <input type="tel" className="form-control" id="phone" pattern="(\+91)?(-)?\s*?(91)?\s*?(\d{3})-?\s*?(\d{3})-?\s*?(\d{4})" value={phone} onChange={(e) => handlePhone(e.target.value)} aria-describedby="phone" required />

                            </div>
                            <div class="form-group">
                                <label for="biriyani">biriyani type</label>
                                <input type="text" class="form-control" id="biriyani" value="chicken (1/2 plate + 2 piece of chicken 65)" disabled aria-describedby="biriyani" />

                            </div>
                            <div class="form-group">
                                <label for="quantity">quantity</label>
                                <input type="number" class="form-control" id="quantity" onChange={(e) => handlyChange(e.target.value)} required />
                            </div>
                            {quantity !== 0 ? <h6>Amount : {amount}</h6> : <h6></h6>}
                            <button type="submit" class="btn btn-primary">order now</button>
                        </form>
                    </div>

                </div>
            </div>
        </div>
        <section id='home'>
            <div className='homeBg'>
                <div className='content'>
                    <h1>Turning Point</h1>
                    <p>the only place to get a home made biriyani</p>
                    <i className="fas fa-angle-double-down"></i>
                </div>
            </div>
        </section>
        <Offers />
        <Contact />
        <Footer />

    </React.Fragment>);
}

export default Home;