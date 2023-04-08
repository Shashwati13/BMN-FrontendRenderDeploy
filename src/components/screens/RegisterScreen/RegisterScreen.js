import React, { useContext, useState } from "react";
import { registerWithEmailAndPassword } from "../../../firebase";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Cookies from "js-cookie";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useHistory } from "react-router-dom";
import Alert from "react-bootstrap/Alert";

function RegisterScreen() {
  const user = Cookies.get("user");

  const history = useHistory();
  if (user) {
    history.push("/dashboard");
    window.location.reload();
  }

  const [showAlert, setAlert] = useState(false);
  const [showError, setError] = useState("");
  const [pwMatch, setPwMatch] = useState("");
  const [validated, setValidated] = useState(false);
  const handleSignUp = async (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      setValidated(true);
    } else {
      e.preventDefault();
      const { name, email, passwordOne, passwordTwo } = e.target.elements;
      if (passwordOne.value !== passwordTwo.value) {
        setPwMatch("Passwords do not match");
        setError(pwMatch);
        setAlert(true);
        return false;
      }

      try {
        let registerData = await registerWithEmailAndPassword(
          email.value,
          passwordOne.value
        );
        let idToken = await registerData.user.getIdToken();

        try {
          let { data } = await axios.post(
            "http://localhost:4000/users/signup",
            {
              name: name.value,
              role: "USER",
            },
            {
              headers: {
                Authorization: "Bearer " + idToken,
              },
            }
          );
          if (data) {
            Cookies.set("user", data._id);
            Cookies.set("userName", data.name);
            Cookies.set("token", idToken);
            history.push("/dashboard");
            window.location.reload();
          }
        } catch (e) {
          setError(e.message);
          setAlert(true);
        }
      } catch (error) {
        setError(error.message);
        setAlert(true);
      }
    }
  };
  return (
    <div className="d-flex justify-content-center mt-4">
      <Card className="p-3" style={{ width: "40%", marginTop: "20px" }}>
        <Card.Title className="d-flex justify-content-center">
          SIGN UP
        </Card.Title>
        <Card.Body>
          <Alert
            variant="danger"
            show={showAlert}
            onClose={() => setAlert(false)}
            dismissible
          >
            {showError}
          </Alert>
          <Form noValidate validated={validated} onSubmit={handleSignUp}>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="validationCustom00">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                />
                <Form.Control.Feedback type="invalid">
                  Enter valid name
                </Form.Control.Feedback>
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="validationCustom01">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  required
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                />
                <Form.Control.Feedback type="invalid">
                  Enter valid Email
                </Form.Control.Feedback>
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="validationCustom03">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="passwordOne"
                  placeholder="Password"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Enter valid Password
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="validationCustom04">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  name="passwordTwo"
                  placeholder="Confirm Password"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Enter valid Password
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Button type="submit">Sign UP</Button>
          </Form>
          <br />
        </Card.Body>
      </Card>
    </div>
  );
}

export default RegisterScreen;
