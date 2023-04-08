import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Row, Col } from "react-bootstrap";
import "./Dashboard.css";
import Card from "react-bootstrap/Card";
import InputGroup from "react-bootstrap/InputGroup";
import Spinner from "react-bootstrap/Spinner";
import Carousel from "react-bootstrap/Carousel";
import { Link } from "react-router-dom";
function Dashboard() {
  const [isLoading, setIsLoading] = useState(false);
  const [getProperties, setProperties] = useState([]);
  const [getSearchKey, setSearchKey] = useState("");
  const [getSearchError, setSearchError] = useState(false);
  // let isSerchError = false;

  const getData = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:4000/property/?search=${getSearchKey}`
      );
      if (data.length === 0) {
        setSearchError(true);
      }
      setProperties(data);
    } catch (e) {
      setSearchError(true);
      if (e.response.status === 404) {
      } else {
        // alert(e.response.data.error);
      }
    }
  };

  useEffect(() => {
    getData();
  }, [getSearchKey]);

  const buildCard = (prop) => {
    let propCro = prop.propertyImages.map((d) => {
      return (
        <Carousel.Item>
          <img
            style={{ height: "200px" }}
            className="d-block w-100"
            src={d}
            alt={d}
          />
        </Carousel.Item>
      );
    });

    return (
      <Card style={{ width: "18rem", height: "100%" }}>
        <Carousel>{propCro}</Carousel>
        <Link
          style={{ textDecoration: "none", color: "black" }}
          to={`/property/${prop._id}`}
        >
          <Card.Body>
            <Card.Title>{prop.propertyName}</Card.Title>
            <Card.Text>
              {prop.propertyAddress.addressOne}{" "}
              {prop.propertyAddress.addressTwo}, {prop.propertyAddress.city},
              {prop.propertyAddress.state} {prop.propertyAddress.zip}
            </Card.Text>
            <Card.Text>Rent: ${prop.propertyPrice}</Card.Text>
            <Card.Text>Bedrooms: {prop.bedrooms}</Card.Text>
            <Card.Text>Bathrooms: {prop.bathrooms}</Card.Text>
          </Card.Body>
        </Link>
      </Card>
    );
  };

  const handleChange = (e) => {
    setSearchError(false);
    if (e.target.value.length >= 0) {
      let searchTerm = e.target.value;
      setSearchKey(searchTerm);
    }
  };
  return (
    <div className="propertiesList">
      <Row>
        <Col md={{ span: 6, offset: 3 }} style={{ marginTop: "40px" }}>
          <h1>Welcome To Book My Nest !</h1>
          <InputGroup size="lg" className="mb-3 searchInput">
            <Form.Control
              onChange={(e) => handleChange(e)}
              placeholder="Enter a City, State, or ZIP code"
              aria-label="Search for Rentals"
              aria-describedby="basic-addon2"
              id="search"
              required
            />
          </InputGroup>
        </Col>
      </Row>
      {getSearchError ? (
        <div className="error">
          <p>No Properties to display!!!</p>
        </div>
      ) : (
        <div>
          {isLoading ? (
            <div className="justify-content-center">
              <Spinner
                size="xl"
                animation="border"
                variant="danger"
                role="status"
              ></Spinner>
            </div>
          ) : (
            <div className="row">
              {getProperties.map((prop) => {
                return (
                  <div
                    className="col"
                    style={{ marginTop: "20px" }}
                    key={prop._id}
                  >
                    {buildCard(prop)}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Dashboard;
