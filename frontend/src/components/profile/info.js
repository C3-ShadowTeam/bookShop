import React, { useState, useContext, useEffect } from "react";
import { userContext } from "../../App";
import "./profile.css";

import axios from "axios";

import "./info.css";
import { Form,Row,Col,Button } from "react-bootstrap";
import swal from "sweetalert";
//important for getting nice style.

export const Info = () => {
  const [info, setInfo] = useState([]);
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [country, setCountry] = useState();
  const [phone, setPhone] = useState();
  const [date, setDate] = useState();
  const [message, setMessage] = useState("");
  const state = useContext(userContext);
  const token = state.token;
  const [images, setImages] = useState([]);
  const maxNumber = 69;
  const [imageSrc, setImageSrc] = useState()

  const handleImageSelect = (e) => {
    setImageSrc(URL.createObjectURL(e.target.files[0]))
  }
  const onChange = (imageList, addUpdateIndex) => {
    setImages(imageList);
  };
  useEffect(() => {
    axios
      .get(
        "http://localhost:5000/users",

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setInfo([...res.data.userInfo]);
      });
  }, []);
  const updateInfo = () => {
    console.log(date);
    axios
      .put(
        "http://localhost:5000/users/update",
        {
          firstName: firstName,
          lastName: lastName,
          phoneNumber: phone,
          BirthDate: date,
          country: country,
        },

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setInfo([...res.data.userInfo]);
        swal({
          title: "success update your information ",
          icon: "success",
          button: "OK",
        });
      }) .catch((err) => {
        console.log(err);
        
      });
  };
  return (
    <div className="userProfile">
    <div className="leftdiv">
      <div className="profileImg">
       
        <img
              className="imgProfile"
              src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
            />
      
      
      </div>
      <h4 className="NameOfUser">
        
      </h4>
    </div>

    <div className="imgAndInfo">
      <div className="middleDiv">
      
      <h5 className="details2">
     
     
      <div className="">
      {info &&
          info.map((element, index) => {
            return (
              <Form>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label>FirstName</Form.Label>
                  <Form.Control type="text" placeholder="Enter FirstName" defaultValue={element.firstName}  onChange={(e) => {
                      setFirstName(e.target.value);
                    }}/>
                </Form.Group>
            
                <Form.Group as={Col} controlId="formGridPassword">
                  <Form.Label>LastName</Form.Label>
                  <Form.Control type="text" placeholder="Enter LastName"  defaultValue={element.lastName}
                    onChange={(e) => {
                      setLastName(e.target.value);
                    }} />
                </Form.Group>
              </Row>
            
              <Form.Group className="mb-3" controlId="formGridAddress1">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control placeholder="1234"   defaultValue={element.phoneNumber}
                    onChange={(e) => {
                      setPhone(e.target.value);
                    }} />
              </Form.Group>
            
              <Form.Group className="mb-3" controlId="formGridAddress2">
                <Form.Label>BirthDate</Form.Label>
                <Form.Control  type="date"  defaultValue={element.BirthDate}
                    onChange={(e) => {
                      setDate(e.target.value);
                    }} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formGridAddress2">
                <Form.Label>Country</Form.Label>
                <Form.Control  placeholder="Your country" defaultValue={element.country}
                    onChange={(e) => {
                      setCountry(e.target.value);
                    }}/>
              </Form.Group>
              <Button variant="primary"  onClick={updateInfo}>
                update
              </Button>
            </Form>
            );
          })}
    
  </div>
          </h5>
         
       
       
      </div>

     
    </div>

    
    
  </div>






   
  );
};