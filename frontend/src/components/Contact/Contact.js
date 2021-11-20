import React from "react";
import "./contact.css";
import emailjs from "emailjs-com";
import swal from "sweetalert";

export const Contact = () => {
  window.scrollTo(0, 0)
  const sendEmail = (e) => {
    console.log("working");
    e.preventDefault();

    emailjs
      .sendForm(
        "gmail",
        "template_jzwlu6m",
        e.target,
        "user_OM0LjSxw6YbJuM14pCm2f"
      )
      .then(
        (result) => {
          console.log(result.text);
          swal(
            "Thank you for youre message",
            "KERO-BOOK team will contact with you as soon as",
            "success"
          );
        },
        (error) => {
          console.log("err", error);
          console.log(error.text);
        }
      );
    e.target.reset();
  };
  return (
    <div className="odaiyy">
      <div className="containers">
        <div className="content">
          <div className="left-side">
            <div className="address details">
              <i className="fas fa-map-marker-alt"></i>
              <div className="topic">Address</div>
              <div className="text-one">Amman-Jordan</div>
              <div className="text-two">str20,Bul10</div>
            </div>
            <div className="phone details">
              <i className="fas fa-phone-alt"></i>
              <div className="topic">Phone</div>
              <div className="text-one">+0096277777777</div>
              <div className="text-two">+0096288888888</div>
            </div>
            <div className="email details">
              <i className="fas fa-envelope"></i>
              <div className="topic">Email</div>
              <div className="text-one">KeroBook@gmail.com</div>
              <div className="text-two">info.bookshop@gmail.com</div>
            </div>
          </div>
          <div className="right-side">
            <div className="topic-text">Send us a message</div>
            <p>
              If you have any note from us or any types of quries related to our
              App, you can send Us message from here. It's my pleasure to help
              you.
            </p>
            <form onSubmit={sendEmail}>
              <div className="input-box">
                <input
                  type="text"
                  className="form-control p-4"
                  placeholder="Your Name"
                  required="required"
                  name="from_name"
                />
              </div>
              <div className="input-box">
                <input
                  type="email"
                  className="form-control p-4"
                  placeholder="Your Email"
                  required="required"
                  name="email"
                />
              </div>

              <div className="input-box">
                <input
                  type="text"
                  className="form-control p-4"
                  placeholder="Subject"
                  required="required"
                  name="subject"
                />
              </div>
              <div className="input-box">
              <textarea
                className="form-control py-3 px-4"
                rows="5"
                placeholder="Message"
                required="required"
                name="message"
              ></textarea>
</div>
<div className="button ">
              <button
                
                style={{
                  width: "130px",
                  marginTop: "5PX",
                  height: "38px",
                  background: "#72147e",
                  cursor: "pointer",
                  color: "#f0e7f2"
                }}
                type="submit"
              >
                Send
              </button>
              </div>
              
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
/*dd
 <form onSubmit={sendEmail}>

              <div className="input-box">
                <input
                  type="text"
                  className="form-control p-4"
                  placeholder="Your Name"
                  required="required"
                  name="from_name"
                />
              </div>
              <div className="input-box">
                <input
                  type="email"
                  className="form-control p-4"
                  placeholder="Your Email"
                  required="required"
                  name="email"
                />
              </div>
              <div className="input-box">
                <input
                  type="text"
                  className="form-control p-4"
                  placeholder="Subject"
                  required="required"
                  name="subject"
                />
              </div>
              <div className="input-box ">
                <textarea
                  className="form-control py-3 px-4"
                  rows="5"
                  placeholder="Message"
                  required="required"
                  name="message"
                ></textarea>
              </div>
              <div className="input-box message-box"></div>
              <div className="button ">
                <input type="button" value="Send Now" />
              </div>
            </form>*/
