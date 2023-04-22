import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Cookies from "js-cookie";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
  LoadScript,
} from "@react-google-maps/api";
// import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
// import Alert from "react-bootstrap/Alert";
// import Tab from "react-bootstrap/Tab";
// import Tabs from "react-bootstrap/Tabs";
import Carousel from "react-bootstrap/Carousel";
import { Link, useParams } from "react-router-dom";
// import Spinner from "react-bootstrap/Spinner";

function PropertyDetail() {
  const [map, setMap] = useState(null);
  var [center, setCenter] = useState({});
  const { id } = useParams();
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyDF23s0BdVZxNdVw-SE2-81MIjQUawQcS4",
    libraries: ["places"],
  });

  const [index, setIndex] = useState(0);
  const [getProperties, setProperties] = useState(undefined);
  let userId = Cookies.get("user");
  // console.log(id);
  const getData = async () => {
    try {
      const { data } = await axios.get(`http://localhost:4000/property/${id}`);
      setProperties(data);
      // console.log("Hllo",parseFloat(data.latitude.latitude))
      var integerLongitude = parseFloat(data.longitude.longitude);
      var integerLatitude = parseFloat(data.latitude.latitude);
      var center1 = { lat: integerLatitude, lng: integerLongitude };
      setCenter(center1);
      // console.log("Center")
      // console.log("Center",center1)
    } catch (e) {
      if (e.response.status === 404) {
      } else {
        // alert(e.response.data.error);
      }
    }
  };

  useEffect(() => {
    getData();
  }, []);
  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading maps...";

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };
  let detailData = undefined;
  if (getProperties) {
    detailData = (
      <Row>
        <Col sm={6}>
          <Row>
            <Carousel activeIndex={index} onSelect={handleSelect}>
              {getProperties.propertyImages.map((img) => {
                return (
                  <Carousel.Item>
                    <img
                      style={{ height: "500px" }}
                      className="d-block w-100"
                      src={img}
                      alt={img}
                    />
                  </Carousel.Item>
                );
              })}
            </Carousel>
          </Row>
          <Row>
            <Col sm={4}>
              <Row>
                <Card
                  style={{
                    width: "100%",
                    marginBottom: "10px",
                    marginTop: "10px",
                  }}
                >
                  <Card.Body>
                    <Card.Text>
                      Price: ${getProperties.propertyPrice} + tax
                    </Card.Text>
                    {getProperties.createdBy.toString() === userId ? (
                      getProperties.isBooked === true ? (
                        <div>Booking Status: Booked</div>
                      ) : (
                        <div>Booking Status: Not Booked</div>
                      )
                    ) : getProperties.isBooked === true ? (
                      <div>Booking Status: Booked</div>
                    ) : (
                      <Link to={`/property/${id}/book`}>
                        <Button>Book Now</Button>
                      </Link>
                    )}
                  </Card.Body>
                </Card>
              </Row>
              <Row>
                <Card style={{ width: "100%", marginTop: "10px" }}>
                  <div
                    className="google_maps_show"
                    style={{
                      height: "150px",
                      width: "200%",
                      position: "absolute",
                    }}
                  >
                    <GoogleMap
                      center={center}
                      zoom={14}
                      mapContainerStyle={{ width: "100%", height: "100%" }}
                      options={{
                        zoomControl: false,
                        streetViewControl: false,
                        mapTypeControl: false,
                        fullscreenControl: false,
                      }}
                      onLoad={(map) => setMap(map)}
                    >
                      <Marker
                        position={{ lat: center.lat, lng: center.lng }}
                        map={map}
                      />
                    </GoogleMap>
                  </div>
                </Card>
              </Row>
            </Col>
          </Row>
        </Col>
        <Col sm={6}>
          <Row>
            <Card style={{ width: "100%" }}>
              <Card.Body>
                <Card.Title>{getProperties.propertyName}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {getProperties.bedrooms} Bed {getProperties.bathrooms} Bath
                </Card.Subtitle>
                <Card.Text>
                  Address: {getProperties.propertyAddress.addressOne}{" "}
                  {getProperties.propertyAddress.addressTwo},{" "}
                  {getProperties.propertyAddress.city},
                  {getProperties.propertyAddress.state}{" "}
                  {getProperties.propertyAddress.zip}
                </Card.Text>
              </Card.Body>
            </Card>
          </Row>

          <Row>
            <Card style={{ width: "100%", marginTop: "10px" }}>
              <Card.Body>
                <Card.Title>Utilities</Card.Title>
                <Card.Text>
                  Gas: {getProperties.utilities.gas === "true" ? " Yes" : " No"}
                  <br />
                  Water:
                  {getProperties.utilities.water === "true" ? " Yes" : " No"}
                  <br />
                  Electricity:
                  {getProperties.utilities.electricity === "true"
                    ? " Yes"
                    : " No"}
                  <br />
                  Heat:
                  {getProperties.utilities.heat === "true" ? " Yes" : " No"}
                  <br />
                  Air Conditioning:
                  {getProperties.utilities.ac === "true" ? " Yes" : " No"}
                </Card.Text>
              </Card.Body>
            </Card>
          </Row>
          <Row>
            <Card style={{ width: "100%", marginTop: "10px" }}>
              <Card.Body>
                <Card.Title>Amenities</Card.Title>
                <Card.Text>
                  Pet:
                  {getProperties.amenities.pet === "true" ? " Yes" : " No"}
                  <br />
                  Laundry:
                  {getProperties.amenities.laundry === "true" ? " Yes" : " No"}
                  <br />
                  Parking Space:
                  {getProperties.amenities.parking === "true" ? " Yes" : " No"}
                </Card.Text>
              </Card.Body>
            </Card>
          </Row>
          <Row>
            <Card style={{ width: "100%", marginTop: "10px" }}>
              <Card.Body>
                <Card.Title>Contact Info</Card.Title>
                <Card.Text>
                  Name: {getProperties.personalInfo.firstName}{" "}
                  {getProperties.personalInfo.lastName}
                </Card.Text>
                <Card.Text>Email: {getProperties.personalInfo.email}</Card.Text>
                <Card.Text>Phone: {getProperties.personalInfo.phone}</Card.Text>
              </Card.Body>
            </Card>
          </Row>
        </Col>
      </Row>
    );
  } else {
    detailData = (
      <div>
        <h3>Loading...</h3>
      </div>
    );
  }

  return <div style={{ marginTop: "40px" }}>{detailData}</div>;
}

export default PropertyDetail;
