import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Cookies from "js-cookie";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Alert from "react-bootstrap/Alert";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Carousel from "react-bootstrap/Carousel";
import Spinner from "react-bootstrap/Spinner";
import { Link, useHistory } from "react-router-dom";
import {
  useJsApiLoader,
//   GoogleMap,
//   Marker,
  Autocomplete,
  DirectionsRenderer,
  LoadScript,
} from "@react-google-maps/api";
import Table from "react-bootstrap/Table";
import moment from "moment/moment";
import Badge from "react-bootstrap/Badge";
function Owner() {
  let token = Cookies.get("token");
  let userId = Cookies.get("user");
  let propCards = undefined;
  const history = useHistory();
  const [getPropList, setPropList] = useState(undefined);
  const [showAlert, setAlert] = useState(false);
  const [showError, setError] = useState("");
  const [showSuccess, setSuccess] = useState(false);
  const [getHidden, setHidden] = useState(false);
  const [map, setMap] = useState(null);
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState("");
  const [getProperties, setProperties] = useState(undefined);
  const [addressOne1, setaddressOne] = useState("");

  const sourceRef = useRef(null);

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyDF23s0BdVZxNdVw-SE2-81MIjQUawQcS4",
    libraries: ["places"],
  });

  const getData = async () => {
    try {
      const header = {
        headers: {
          authorization: "Bearer " + token,
        },
      };
      const { data } = await axios.get(
        `https://bookmynest-backend.onrender.com/property/user/${userId}`,
        header
      );
      setPropList(data);
    } catch (e) {
      if (e.response.status === 404) {
      } else {
        // alert(e.response.data.error);
      }
    }
    try {
      const header = {
        headers: {
          authorization: "Bearer " + token,
        },
      };
      const { data } = await axios.get(
        `https://bookmynest-backend.onrender.com/users/${userId}/manage/bookings`,
        header
      );
      setProperties(data);
    } catch (e) {
      if (e.response.status === 404) {
      } else {
      }
    }
  };

  useEffect(() => {
    getData();
  }, []);
  if (getPropList && getPropList.length !== 0) {
    propCards = getPropList.map((prop) => {
      let propCro = prop.propertyImages.map((d) => {
        return (
          <Carousel.Item>
            <img className="d-block w-100" src={d} alt={d} />
          </Carousel.Item>
        );
      });

      const center = { lat: prop.latitude, lng: prop.longitude };
      console.log("Center", center.lat);
      return (
        <div className="col" key={prop._id}>
          <Card style={{ width: "18rem" }}>
            <Carousel>{propCro}</Carousel>
            <Link
              style={{ textDecoration: "none", color: "black" }}
              to={`/property/${prop._id}`}
            >
              <Card.Body>
                <Card.Title>{prop.propertyName}</Card.Title>
                <Card.Text>
                  {prop.propertyAddress.addressOne}
                  {prop.propertyAddress.addressTwo}, {prop.propertyAddress.city}
                  ,{prop.propertyAddress.state} {prop.propertyAddress.zip}
                </Card.Text>
                <Card.Text>Rent: ${prop.propertyPrice}</Card.Text>
                <Card.Text>Bedrooms: {prop.bedrooms}</Card.Text>
                <Card.Text>Bathrooms: {prop.bathrooms}</Card.Text>

                {/* <div className="google_maps_show" style={{height:"150px", width:"100%",position:"absolute"}}>
                <GoogleMap
                    center={center}
                    zoom={15}
                    mapContainerStyle={{ width: "90%", height: "90%" }}
                    options={{
                        zoomControl: false,
                        streetViewControl: false,
                        mapTypeControl: false,
                      fullscreenControl: false,
                     }}
                    onLoad={(map) => setMap(map)}>
                  //<Marker position={center} /> 
                  {center.lat && center.lng && <Marker position={center} />}
                  </GoogleMap>
                </div> */}
              </Card.Body>
            </Link>
          </Card>
        </div>
      );
    });
  }

  let states = [
    "Alabama",
    "Alaska",
    "Arizona",
    "Arkansas",
    "California",
    "Colorado",
    "Connecticut",
    "Delaware",
    "Florida",
    "Georgia",
    "Hawaii",
    "Idaho",
    "Illinois",
    "Indiana",
    "Iowa",
    "Kansas",
    "Kentucky",
    "Louisiana",
    "Maine",
    "Maryland",
    "Massachusetts",
    "Michigan",
    "Minnesota",
    "Mississippi",
    "Missouri",
    "Montana",
    "Nebraska",
    "Nevada",
    "New Hampshire",
    "New Jersey",
    "New Mexico",
    "New York",
    "North Carolina",
    "North Dakota",
    "Ohio",
    "Oklahoma",
    "Oregon",
    "Pennsylvania",
    "Rhode Island",
    "South Carolina",
    "South Dakota",
    "Tennessee",
    "Texas",
    "Utah",
    "Vermont",
    "Virginia",
    "Washington",
    "West Virginia",
    "Wisconsin",
    "Wyoming",
  ];
  const addProperty = async () => {
    setHidden(true);
    try {
      const sourcePlace = sourceRef.current.getPlace();
      const latitude = sourcePlace.geometry.location.lat();
      const longitude = sourcePlace.geometry.location.lng();
      let propertyName = document.getElementById("pName").value.trim();

      let addressOne = sourcePlace.formatted_address.split(",")[0].trim(); //let addressOne = document.getElementById("add1").value.trim();

      let addressTwo = document.getElementById("add2").value.trim();
      let city = document.getElementById("city").value.trim();
      let state = document.getElementById("state").value.trim();
      let zip = document.getElementById("zip").value.trim();
      let heat = document.getElementById("heat").checked;
      let gas = document.getElementById("gas").checked;
      let water = document.getElementById("water").checked;
      let electricity = document.getElementById("electricity").checked;
      let ac = document.getElementById("ac").checked;
      let pet = document.getElementById("pet").checked;
      let laundry = document.getElementById("laundry").checked;
      let parking = document.getElementById("freeParking").checked;
      let files = document.getElementById("files").files;
      let price = document.getElementById("price").value.trim();
      let bedrooms = document.getElementById("bedrooms").value.trim();
      let bathrooms = document.getElementById("bathrooms").value.trim();
      let fName = document.getElementById("fName").value.trim();
      let lName = document.getElementById("lName").value.trim();
      let email = document.getElementById("email").value.trim();
      let phone = document.getElementById("phone").value.trim();
      let role = document.getElementById("role").value.trim();

      if (propertyName.length === 0) {
        setHidden(false);
        setError("Property Name is Empty");
        setAlert(true);
      } else if (addressOne.length === 0) {
        setError("Address 1 is Empty");
        setHidden(false);
        setAlert(true);
      } else if (addressTwo.length === 0) {
        setError("Address 2 is Empty");
        setHidden(false);
        setAlert(true);
      } else if (city.length === 0) {
        setError("City is Empty");
        setHidden(false);
        setAlert(true);
      } else if (state.length === "Choose...") {
        setError("Select Sate is Empty");
        setHidden(false);
        setAlert(true);
      } else if (zip.length === 0) {
        setError("Zip code is Empty");
        setHidden(false);
        setAlert(true);
      } else if (price.length === 0) {
        setError("Price is Empty");
        setHidden(false);
        setAlert(true);
      } else if (files.length === 0) {
        setError("Upload at least One Image");
        setHidden(false);
        setAlert(true);
      } else if (bedrooms.length === 0) {
        setError("Bedrooms is Empty");
        setHidden(false);
        setAlert(true);
      } else if (bathrooms.length === 0) {
        setError("Bathrooms is Empty");
        setHidden(false);
        setAlert(true);
      } else if (fName.length === 0) {
        setError("First Name is Empty");
        setHidden(false);
        setAlert(true);
      } else if (lName.length === 0) {
        setError("Last Name is Empty");
        setHidden(false);
        setAlert(true);
      } else if (email.length === 0) {
        setError("Email is Empty");
        setHidden(false);
        setAlert(true);
      } else if (phone.length === 0) {
        setError("Contact Number is Empty");
        setHidden(false);
        setAlert(true);
      } else if (role.length === "choose") {
        setError("Select Your Role");
        setHidden(false);
        setAlert(true);
      } else {
        var formData = new FormData();
        let lenFile = files.length;
        for (let i = 0; i < lenFile; i++) {
          formData.append("files", files[i]);
        }
        formData.append("propertyName", propertyName);
        formData.append("addressOne", addressOne);
        formData.append("addressTwo", addressTwo);
        formData.append("city", city);
        formData.append("state", state);
        formData.append("zip", zip);
        formData.append("heat", heat);
        formData.append("gas", gas);
        formData.append("water", water);
        formData.append("electricity", electricity);
        formData.append("ac", ac);
        formData.append("pet", pet);
        formData.append("laundry", laundry);
        formData.append("parking", parking);
        formData.append("price", price);
        formData.append("bedrooms", bedrooms);
        formData.append("bathrooms", bathrooms);
        formData.append("fName", fName);
        formData.append("lName", lName);
        formData.append("email", email);
        formData.append("phone", phone);
        formData.append("role", role);
        formData.append("latitude", latitude);
        formData.append("longitude", longitude);

        const header = {
          headers: {
            authorization: "Bearer " + token,
            "content-type": "multipart/form-data",
          },
        };
        const { data } = await axios.post(
          "https://bookmynest-backend.onrender.com/property/",
          formData,
          header
        );

        window.location.reload();
      }
    } catch (e) {
      setHidden(false);
      console.log(e);
    }
  };
  // if (loadError) return "Error loading maps";
  // if (!isLoaded) return "Loading maps...";
  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading maps...";

  return (
    <Tabs
      defaultActiveKey="home"
      id="uncontrolled-tab-example"
      className="mb-3"
    >
      <Tab eventKey="home" title="My Listing">
        <div className="d-flex justify-content-md-center mt-4 container row">
          {propCards}
        </div>
      </Tab>
      <Tab eventKey="addProp" title="Add Property">
        <div className="d-flex justify-content-center mt-4">
          <Card className="p-3" style={{ width: "40%", marginTop: "20px" }}>
            <Card.Title className="d-flex justify-content-center">
              Add Your Property
            </Card.Title>
            <Card.Body>
              <Form noValidate>
                <Row className="mb-3">
                  <Form.Group as={Col}>
                    <Form.Label>Property Name</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      name="pName"
                      id="pName"
                      placeholder="Enter property name"
                    />
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  <Autocomplete
                    onLoad={(autocomplete) => {
                      sourceRef.current = autocomplete;
                    }}
                  >
                    <Form.Group as={Col}>
                      <Form.Label>Address 1</Form.Label>
                      <Form.Control placeholder="1234 Main St" id="add1" />
                    </Form.Group>
                  </Autocomplete>
                </Row>
                <Row className="mb-3">
                  <Form.Group as={Col}>
                    <Form.Label>Address 2</Form.Label>
                    <Form.Control
                      type="text"
                      id="add2"
                      placeholder="Apartment, studio, or floor"
                    />
                  </Form.Group>
                </Row>

                <Row className="mb-3">
                  <Form.Group as={Col}>
                    <Form.Label>City</Form.Label>
                    <Form.Control type="text" placeholder="City" id="city" />
                  </Form.Group>

                  <Form.Group as={Col}>
                    <Form.Label>State</Form.Label>
                    <Form.Select defaultValue="Choose..." id="state">
                      <option disabled selected>
                        Choose...
                      </option>
                      {states.map((i) => {
                        return <option value={i}>{i}</option>;
                      })}
                    </Form.Select>
                  </Form.Group>

                  <Form.Group as={Col}>
                    <Form.Label>Zip</Form.Label>
                    <Form.Control type="number" id="zip" placeholder="zip" />
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  <Form.Group as={Col}>
                    <Form.Label>Utilities Included:</Form.Label>
                    <Form.Check type="checkbox" id="gas" label="Gas" />
                    <Form.Check type="checkbox" id="water" label="Water" />
                    <Form.Check
                      type="checkbox"
                      id="electricity"
                      label="Electricity"
                    />
                    <Form.Check type="checkbox" id="heat" label="Heat" />
                    <Form.Check
                      type="checkbox"
                      id="ac"
                      label="Air Conditioning"
                    />
                  </Form.Group>
                  <Form.Group as={Col}>
                    <Form.Label>Property Amenities:</Form.Label>
                    <Form.Check type="checkbox" id="pet" label="Pet Allowed" />
                    <Form.Check type="checkbox" id="laundry" label="Laundry" />
                    <Form.Check
                      type="checkbox"
                      id="freeParking"
                      label="Free Parking"
                    />
                  </Form.Group>
                </Row>

                <Row className="mb-3">
                  <Form.Group as={Col}>
                    <Form.Label>Property Images:</Form.Label>
                    <Form.Control type="file" id="files" multiple />
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  <Form.Group as={Col}>
                    <Form.Label>Bedrooms</Form.Label>
                    <Form.Control
                      required
                      type="number"
                      name="bedrooms"
                      id="bedrooms"
                      placeholder="Bedrooms"
                    />
                  </Form.Group>
                  <Form.Group as={Col}>
                    <Form.Label>Bathrooms</Form.Label>
                    <Form.Control
                      required
                      type="number"
                      name="bathrooms"
                      id="bathrooms"
                      placeholder="Bathrooms"
                    />
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  <Form.Group as={Col}>
                    <Form.Label>Property Price:</Form.Label>
                    <Form.Control
                      required
                      type="number"
                      name="price"
                      id="price"
                      placeholder="Enter property price $"
                    />
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  <div>
                    <p className="h4">Personal Information:</p>
                  </div>
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
                  <Form.Group as={Col}>
                    <Form.Label>Your Role</Form.Label>
                    <Form.Select aria-label="Default select example" id="role">
                      <option value="choose" disabled selected>
                        Select Your Role
                      </option>
                      <option value="owner">Owner</option>
                      <option value="agent">Agent</option>
                      <option value="manager">Manager</option>
                    </Form.Select>
                  </Form.Group>
                </Row>
                <Alert
                  variant={showSuccess ? "success" : "danger"}
                  show={showAlert}
                  onClose={() => setAlert(false)}
                  dismissible
                >
                  {showError}
                </Alert>
                <Button onClick={addProperty} hidden={getHidden}>
                  Submit
                </Button>
                <Button variant="primary" hidden={!getHidden} disabled>
                  <Spinner
                    as="span"
                    animation="grow"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                  Submitting...
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </Tab>
      <Tab eventKey="booking" title="Bookings">
        <Table responsive>
          <thead>
            <tr>
              <th>Property Name</th>
              <th>Booking Dates</th>
              <th>Booked By</th>
              <th>Contact No</th>
              <th>Email</th>
              <th>Payment Status</th>
            </tr>
          </thead>
          <tbody>
            {getProperties ? (
              getProperties.map((i) => {
                return (
                  <tr
                    key={i._id}
                    onClick={() => {
                      history.push(`/property/${i._id.toString()}`);
                      window.location.reload();
                    }}
                  >
                    <td>{i.propertyName}</td>
                    <td>
                      {moment(i.bookingInfo[0].startDate).format("MMM Do YYYY")}{" "}
                      {" to  "}
                      {moment(i.bookingInfo[0].endDate).format("MMM Do YYYY")}
                    </td>
                    <td>
                      {i.bookingInfo[0].fName} {i.bookingInfo[0].lName}
                    </td>
                    <td>{i.bookingInfo[0].phone}</td>
                    <td>{i.bookingInfo[0].email}</td>
                    <td>
                      <Badge pill bg="success">
                        PAID
                      </Badge>
                    </td>
                  </tr>
                );
              })
            ) : (
              <div>No Data To show</div>
            )}
          </tbody>
        </Table>
      </Tab>
    </Tabs>
  );
}

export default Owner;

// references:
// imageupload:https://www.youtube.com/watch?v=YOGgaYUW1OA
