import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Alert from "react-bootstrap/Alert";
import Cookies from "js-cookie";
function AdminLogin() {
  const [showAlert, setAlert] = useState(false);
  const [showError, setError] = useState("");
  const history = useHistory();
  const onSubmit = async () => {
    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value.trim();
    if (email === "admin@bookmynest.com" && password === "admin123@;book") {
      Cookies.set("token", "admin");
      history.push("/admin/users");
      window.location.reload();
    } else {
      setAlert(true);
      setError("Wrong Credentials");
    }
  };
  return (
    <div className="d-flex justify-content-center mt-4">
      <Card className="p-3" style={{ width: "40%", marginTop: "20px" }}>
        <Card.Title className="d-flex justify-content-center">
          Admin Login
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
          <Form>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Button variant="primary" onClick={onSubmit}>
              Submit
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}

export default AdminLogin;
