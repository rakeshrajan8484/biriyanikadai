import React from 'react';

const Contact = () => {
    return (<section id='contact'>
        <div className='content'>
            <h1>Drop us your comment</h1>
            <form className="needs-validation" action="https://formspree.io/FORM_ID" method="POST">
                <div className="form-group">
                    <input type="text" className="form-control" name="Name" aria-describedby="nameHelp" required />
                    <label htmlFor="exampleInputEmail1">Name</label>
                </div>
                <div className="form-group">
                    <input type="email" className="form-control" name="Email" aria-describedby="emailHelp" required />
                    <label htmlFor="exampleInputEmail1">Email address</label>
                </div>
                <div className="form-group">
                    <input type="tel" className="form-control" name="phone" pattern="(\+91)?(-)?\s*?(91)?\s*?(\d{3})-?\s*?(\d{3})-?\s*?(\d{4})" required />
                    <label htmlFor="phone">phone</label>
                </div>
                <div className="form-group">
                    <textarea row="3" className="form-control" name="comment" required />
                    <label className="form-check-label" htmlFor="comment">comment</label>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    </section>);
}

export default Contact;