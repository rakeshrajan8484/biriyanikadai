import React from 'react';
import img10 from './images/10.jpg'
import img46416 from './images/46416.jpg'
import img3902849 from './images/3902849.jpg'

const Offers = () => {
    return (<section id="offers" className='container flex-column'>
        <h1>What we Offer?</h1>
        <div className="d-flex justify-content-between w-100 mt-5">
            <div className='offer'>
                <h2>Home made biriyani</h2>
                <img src={img10} alt='Home made biriyani' className='img-fluid'/>
            </div>
            <div className='offer'>
                <h2>Free home delivery</h2>
                <img src={img46416} alt='free delivery' className='img-fluid'/>
            </div>
            <div className='offer'>
                <h2>Online Booking</h2>
                <img src={img3902849} alt='Online Booking' className='img-fluid'/>
            </div>
        </div>
    </section>);
}

export default Offers; 