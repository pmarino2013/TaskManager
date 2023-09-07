import React, { useState } from 'react';
import emailjs from 'emailjs-com';

const Contact = () => {
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      inquiry: '',
      subscribe: true,
    });
  
    const handleChange = (e) => {
      const { name, value, type, checked } = e.target;
      const newValue = type === 'checkbox' ? checked : value;
  
      setFormData({
        ...formData,
        [name]: newValue,
      });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        // Send the form using EmailJS
        await emailjs.sendForm('service_bxl40rs', 'template_goi94t2', e.target, 'h3yy4ICYJmisn2ANM');
  
        // Reset the form after successful submission
        setFormData({
          name: '',
          email: '',
          inquiry: '',
          subscribe: true,
        });
  
        alert('The form was successfully submitted!');
      } catch (error) {
        console.error('Error sending the form:', error);
        alert('An error occurred while sending the form. Please try again.');
      }
    };
  
    return (
      <div>
        <body className="my-5">
          <main>
            <section className="container main_contacto">
              <section className="row  mt-5">
                <article className="col-sm-12 col-md-6 my-3">
                  <h3 className="text-center text-light">Send a Message</h3>
                  <form onSubmit={handleSubmit}>
                    <div className="form-group my-3">
                      <label htmlFor="name" className="text-light">
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="John Doe"
                        className="form-control"
                        required
                        value={formData.name}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-group my-3">
                      <label htmlFor="email" className="text-light">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="johndoe@example.com"
                        className="form-control"
                        required
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-group my-3">
                      <label htmlFor="inquiry" className="text-light">
                        Consult
                      </label>
                      <textarea
                        id="inquiry"
                        name="inquiry"
                        className="form-control"
                        placeholder="Enter your inquiry"
                        rows="4"
                        required
                        value={formData.inquiry}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-group form-check my-3">
                      <input
                        type="checkbox"
                        id="subscribe"
                        name="subscribe"
                        className="form-check-input"
                        checked={formData.subscribe}
                        onChange={handleChange}
                      />
                      <label htmlFor="subscribe" className="form-check-label text-light">
                        Subscribe to our newsletters
                      </label>
                    </div>
                    <button type="submit" className="btn btn-primary my-3">
                      Send
                    </button>
                  </form>
                </article>
                <article className="col-sm-12 col-md-6 my-3">
                  <h3 className="text-center text-light">Task Genius</h3>
                  <p className="text-light">
                    Directions to our office for in-person inquiries. We're here to provide you with the best information and assistance.
                  </p>
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3560.1022202999184!2d-65.209390485688!3d-26.83670088316032!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94225d3ad7f30f1d%3A0xf8606cd659b8e3e4!2sRollingCode%20School!5e0!3m2!1ses-419!2sar!4v1616643393539!5m2!1ses-419!2sar"
                    className="w-100"
                    height="290"
                    style={{ border: '0' }}
                    allowFullScreen=""
                    loading="lazy"
                  ></iframe>
                </article>
              </section>
            </section>
          </main>
        </body>
      </div>
    );
  };
  
  export default Contact;