// import "../App.css";
import axios from "axios";
// import firebase from "firebase/compat/app";
import { Link, useHistory, useParams } from "react-router-dom";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { Alert, FormControl } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Cookies from "js-cookie";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js"
import emailjs from "emailjs-com";


function BookingModel() {
  const stripe = useStripe()
  const elements = useElements()
  const [amount1,setAmount]=useState()
  const [show, setShow] = useState(true);
  const [showAlert, setAlert] = useState(false);
  const [showError, setError] = useState("");
  const history = useHistory();
  const { id } = useParams()

  const handleClose = () => {
    setShow(false);
  };
 
  const CARD_OPTIONS = {
    iconStyle: "solid",
    style: {
      base: {
        iconColor: "#c4f0ff",
        color: "#000000",
        fontWeight: 500,
        fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
        fontSize: "16px",
        fontSmoothing: "antialiased",
        ":-webkit-autofill": { color: "#fce883" },
        "::placeholder": { color: "#87bbfd" }
      },

      invalid: {
        iconColor: "#ffc7ee",
        color: "#ffc7ee"
      }
    }
  }
  const [success, setSuccess ] = useState(false)
  
  // const amount=999
  //const [getProperties, setProperties] = useState(undefined);

 

  const createTask = async () => {
    
    try {
    
    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement)
  });
  // const paymentMethodId = paymentMethod.id;
  // console.log(paymentMethodId);
  // if(error) {
  //   console.log("inside error")
  //   return
  // }
 
  if(!error) {
      let fName = document.getElementById("fName").value.trim();
      let lName = document.getElementById("lName").value.trim();
      let email = document.getElementById("email").value.trim();
      let phone = document.getElementById("phone").value.trim();
      let startDate = document.getElementById("startDate").value.trim(); 
      let endDate = document.getElementById("endDate").value.trim();
      const paymentDate = new Date().toISOString().substring(0, 10);
      setTimeout(2000)
      console.log(id)
      const url = `http://localhost:4000/property/${id}`;
      console.log(url);
    
      let data1  = await axios.get(url,{
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setTimeout(2000)
      console.log(data1)
      setAmount(data1.data.propertyPrice);
      console.log("Fetch",data1.data.propertyPrice)
    
      
      const data = {
        fName,
        lName,
        email,
        phone,
        startDate,
        endDate,
        paymentId:paymentMethod.id,
        // amount,
        // paymentDate,
        
      };
    
        const {id:paymentMethodId} = paymentMethod
        console.log("pay",paymentMethodId)
        console.log("amount",data1.data.propertyPrice)
        const response = await axios.post("http://localhost:4000/payment", {
            amount:data1.data.propertyPrice,
            id:paymentMethodId,
            email,
            paymentDate,
            
        })
     
        if(response.data.success) {
          //alert("Hey")
            console.log("Successful payment")
            setSuccess(true)
            const templateParams ={
                email:email,
                amount:data1.data.propertyPrice,
                id:paymentMethodId,
                date:paymentDate
              }
              console.log(templateParams)
              emailjs.send("service_5vicdpb", "template_mbvtu8b", templateParams,"a84WSDrJ5v3LpESJC")
        }if (data.fName.length === 0) {
                setError("First Name cannot be empty");
                setAlert(true);
              } else if (data.lName.length === 0) {
                // alert("Description cannot be empty");
                setError("Last Name cannot be empty");
                setAlert(true);
              } else if (data.email.length === 0) {
                // alert("Description cannot be empty");
                setError("Email cannot be empty");
                setAlert(true);
              } else if (data.phone.length === 0) {
                // alert("Description cannot be empty");
                setError("Phone cannot be empty");
                setAlert(true);
           
              }
               else if (data.startDate.length === 0) {
                alert("Start Date cannot be empty");
                setError("Start Date cannot be empty");
                setAlert(true);
              } else if (data.endDate.length === 0) {
             
                setError("End Date cannot be empty");
                setAlert(true);
              } else {
                let sd = Date.parse(data.startDate);
                let ed = Date.parse(data.endDate);
                if (ed < sd) {
               
                  setError("End Date can not be before start date");
                  setAlert(true);
                } else {
                  console.log(data);
                  const idToken = Cookies.get("token");
                  const header = {
                    headers: {
                      authorization: "Bearer " + idToken,
                    },
                  };
                  console.log("Property ID",id);
        
               
                  const res = await axios.post(
                    `http://localhost:4000/property/${id}/book`,
                    data,
                    header
                  );
                  history.push("/bookings");
                  window.location.reload();
                }
              }
        
            
} else {
    console.log(error.message)
} 
    } catch (e) {
      console.log(e);
      alert(e.response.data.error);
    }
  };
 

  return (
    <Modal show={show}>
      <Modal.Header>
        <Modal.Title>Booking Info</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Alert
          variant="danger"
          show={showAlert}
          onClose={() => setAlert(false)}
          dismissible
        >
          {showError}
        </Alert>
        <Form>
          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label>Start Date</Form.Label>
              <Form.Control type="date" id="startDate" name="startDate" />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>End Date</Form.Label>
              <Form.Control type="date" id="endDate" name="endDate" />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label>First Name</Form.Label>
              <Form.Control
                required
                type="text"
                name="fName"
                id="fName"
                placeholder="Enter your first name"
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                required
                type="text"
                name="lName"
                id="lName"
                placeholder="Enter your last name"
              />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label>Email</Form.Label>
              <Form.Control
                required
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email"
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label>Contact Number:</Form.Label>
              <Form.Control
                required
                type="tel"
                name="phone"
                id="phone"
                placeholder="123-456-7890"
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
          <Form.Group >
            <div>
              <p className="h4">Payment Information:</p>
                    <CardElement name="cardN" id="cardN" options={CARD_OPTIONS}/>
            </div>
            </Form.Group>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Link to={`/property/${id}/`}>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Link>
        <Button onClick={createTask} variant="primary">
          Pay
        </Button>
      </Modal.Footer>
    </Modal>
    
  );

}

export default BookingModel;
