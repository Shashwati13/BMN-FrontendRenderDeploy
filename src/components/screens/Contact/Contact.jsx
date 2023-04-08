import React from "react";
import "./Contact.css";
import { useRef } from "react";
import emailjs from "emailjs-com";
// import BG from "../../../book-my-nest-logo (1).png";
import BG from "../../Assets/book-my-nest-logo (1).png";

const Contact = ({ ContactUsvar }) => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_5vicdpb",
        "template_d88hq8q",
        form.current,
        "a84WSDrJ5v3LpESJC"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );

    e.target.reset();
  };
  return (
    ContactUsvar === '/' ? (
      <section className="section_contact" id="contact">
        <h5>Get in Touch</h5>
        <h2>Contact Us</h2>

        <div className="container contact__container">

          <form ref={form} onSubmit={sendEmail}>
            <input
              type="text"
              name="name"
              placeholder="Your Full Name"
              required
            />
            <input type="email" name="email" placeholder="Your Email" required />
            <textarea
              name="message"
              rows="7"
              placeholder="Your Message"
              required></textarea>
            <button type="submit" className="btn btn-primary">
              Send Message
            </button>
          </form>

          <div className="contact__options">
            <div className="about__me">
              <div className="about__me-image">
                <img src={BG} alt="About Image" />
              </div>
              <br />
              <p>Email Us at: IUbookmynest@gmail.com</p>
            </div>

          </div>

        </div>
      </section>
    ) : (
      <></>
    ));
};

export default Contact;
