import React from 'react';
import img10 from './images/10.jpg'
import img46416 from './images/46416.jpg'
import img3902849 from './images/3902849.jpg'
const Offers = () => {
    return ( <section id='offers' className='flex-column container'>
        <h1>What we offer</h1>
        <div className='d-flex justify-content-between w-100 mt-5'>
            <div className='offer'>
                <h2>Home made food</h2>
                <img src={img10} alt="home made" className='img-fluid'/>
            </div>
            <div className='offer'>
                <h2>free delivery</h2>
                <img src={img46416} alt="free delivery" className='img-fluid' />
            </div>
            <div className='offer'>
                <h2>online booking</h2>
                <img src={img3902849} alt="online booking" className='img-fluid' />
            </div>
            
        </div>
    </section> );
}
 
export default Offers;