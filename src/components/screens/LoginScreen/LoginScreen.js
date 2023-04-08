import React, { useContext, useState } from "react";
import {
  logInWithEmailAndPassword,
  signInWithGoogle,
  sendPasswordReset,
} from "../../../firebase";
import axios from "axios";

import Card from "react-bootstrap/Card";
import Cookies from "js-cookie";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Alert from "react-bootstrap/Alert";
import GoogleButton from "react-google-button";
import { useHistory } from "react-router-dom";
function LoginScreen() {
  const user = Cookies.get("user");
  const [showAlert, setAlert] = useState(false);
  const [showError, setError] = useState("");
  const [showSuccess, setSuccess] = useState(false);
  const history = useHistory();
  if (user) {
    history.push("/dashboard");
    window.location.reload();
  }

  const handleLogin = async (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      setValidated(true);
    }

    if (form.checkValidity() === true) {
      event.preventDefault();
      let { email, password } = event.target;
      try {
        let loginData = await logInWithEmailAndPassword(
          email.value,
          password.value
        );
        let idToken = await loginData.user.getIdToken();

        let { data } = await axios.post(
          "http://localhost:4000/users/signup",
          null,
          {
            headers: {
              Authorization: "Bearer " + idToken,
            },
          }
        );
        if (data) {
          console.log(data);
          Cookies.set("user", data._id);
          Cookies.set("userName", data.name);
          Cookies.set("token", idToken);
          history.push("/dashboard");
          window.location.reload();
        }
      } catch (error) {
        setError(error.toString());
        setSuccess(false);
        setAlert(true);
      }
    }
  };
  const [validated, setValidated] = useState(false);

  const passwordReset = (event) => {
    event.preventDefault();
    let email = document.getElementById("validationCustom01").value;
    if (email) {
      sendPasswordReset(email);

      setError("Password reset email has been sent");
      setSuccess(true);
      setAlert(true);
    } else {
      setError(
        "Please enter an email address below before you click the forgot password link"
      );
      setAlert(true);
    }
  };

  const socialSignOn = async () => {
    try {
      let data = await signInWithGoogle();
      let idToken = await data.user.getIdToken();
      try {
        let { data } = await axios.post(
          "http://localhost:4000/users/signup",
          {
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
        console.log(e);
      }
    } catch (error) {
      alert(error);
    }
  };
  return (
    <div className="d-flex justify-content-center mt-4">
      <Card className="p-3" style={{ width: "40%", marginTop: "20px" }}>
        <Card.Title className="d-flex justify-content-center">
          SIGN IN
        </Card.Title>
        <Card.Body>
          <Alert
            variant={showSuccess ? "success" : "danger"}
            show={showAlert}
            onClose={() => setAlert(false)}
            dismissible
          >
            {showError}
          </Alert>
          <Form noValidate validated={validated} onSubmit={handleLogin}>
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
                  name="password"
                  placeholder="Password"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Enter valid Password
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Form.Group className="mb-3">
              <a role={"button"} onClick={passwordReset}>
                Forgot Password?
              </a>
            </Form.Group>
            <Button type="submit">Sign In</Button>
          </Form>

          <br />
          <div>
            <GoogleButton
              onClick={() => socialSignOn("google")}
              alt="google signin"
            />
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

export default LoginScreen;
